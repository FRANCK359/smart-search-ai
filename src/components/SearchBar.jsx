import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, XMarkIcon, MicrophoneIcon } from '@heroicons/react/24/outline';
import api from '../services/api';
import InovLogo from '../assets/Inov.png';

const SearchBar = ({ initialQuery = '', onSearch }) => {
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [browserSupportsSpeech, setBrowserSupportsSpeech] = useState(false);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(initialQuery);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setBrowserSupportsSpeech(true);
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'fr-FR';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
        setTimeout(() => {
          navigate(`/search?q=${encodeURIComponent(transcript)}`);
          if (onSearch) onSearch(transcript);
        }, 300);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          alert("Veuillez autoriser l'accès au microphone pour utiliser la reconnaissance vocale.");
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, [initialQuery, navigate, onSearch]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const fetchSuggestions = async (searchQuery) => {
    try {
      const response = await api.get(`/search/suggest?q=${encodeURIComponent(searchQuery)}`);
      setSuggestions(response.data.suggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      if (onSearch) onSearch(query);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
    if (onSearch) onSearch(suggestion);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const toggleVoiceRecognition = () => {
    if (!browserSupportsSpeech) {
      alert("La reconnaissance vocale n'est pas supportée par votre navigateur");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting voice recognition:', error);
        setIsListening(false);
      }
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative flex items-center w-full">
          {/* Logo rond */}
          <img
            src={InovLogo}
            alt="Logo"
            className="absolute left-3 h-6 w-6 rounded-full object-cover"
          />

          {/* Champ de recherche */}
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Rechercher..."
            className="
              w-full pl-12 pr-28 py-3 rounded-full
              border border-gray-300
              bg-white text-gray-900
              placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
              transition-all duration-200
              dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500
            "
            onFocus={() => query.length > 2 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            autoComplete="off"
            aria-label="Barre de recherche"
          />

          {/* Bouton effacer */}
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="
                absolute right-20 sm:right-24
                text-gray-400 hover:text-gray-600
                dark:text-gray-400 dark:hover:text-gray-300
                transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-primary rounded
              "
              aria-label="Effacer la recherche"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}

          {/* Bouton microphone */}
          {browserSupportsSpeech && (
            <button
              type="button"
              onClick={toggleVoiceRecognition}
              className={`
                absolute right-10 sm:right-14 p-2 rounded-full
                focus:outline-none focus:ring-2 focus:ring-primary
                transition-colors duration-200
                ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300'}
              `}
              aria-label={isListening ? "Arrêter l'écoute" : "Recherche vocale"}
            >
              <MicrophoneIcon className="h-5 w-5" />
            </button>
          )}

          {/* Bouton recherche */}
          <button
            type="submit"
            className="
              absolute right-2
              bg-primary text-white
              dark:bg-primary-dark
              p-2 rounded-full
              hover:bg-blue-700
              dark:hover:bg-blue-600
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-primary-dark
              transition-colors duration-200
            "
            aria-label="Rechercher"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </div>
      </form>

      {/* Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="
          absolute z-10 mt-1 w-full
          bg-white dark:bg-gray-800
          rounded-md shadow-lg
          max-h-60 overflow-y-auto
          ring-1 ring-black ring-opacity-5
        ">
          <ul className="py-1" role="listbox" aria-label="Suggestions de recherche">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="
                  px-4 py-2
                  cursor-pointer
                  hover:bg-gray-100 dark:hover:bg-gray-700
                  text-gray-900 dark:text-gray-100
                  transition-colors duration-200
                  select-none
                "
                onClick={() => handleSuggestionClick(suggestion)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSuggestionClick(suggestion);
                  }
                }}
                role="option"
                aria-selected="false"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
