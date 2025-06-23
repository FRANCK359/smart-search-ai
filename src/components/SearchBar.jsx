import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  XMarkIcon, 
  MicrophoneIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon
} from '@heroicons/react/24/outline';
import api from '../services/api';
import InovLogo from '../assets/Inov.png';

const SearchBar = ({ initialQuery = '', onSearch }) => {
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [hasSpeechSupport, setHasSpeechSupport] = useState(false);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier la compatibilité de la reconnaissance vocale
    setHasSpeechSupport('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
    
    if (hasSpeechSupport) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'fr-FR';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        handleVoiceSearch(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [hasSpeechSupport]);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

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
      if (onSearch) {
        onSearch(query);
      }
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
    if (onSearch) {
      onSearch(suggestion);
    }
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const toggleVoiceSearch = () => {
    if (!hasSpeechSupport) {
      alert("La reconnaissance vocale n'est pas supportée par votre navigateur");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleVoiceSearch = (transcript) => {
    setQuery(transcript);
    navigate(`/search?q=${encodeURIComponent(transcript)}`);
    if (onSearch) {
      onSearch(transcript);
    }
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="relative flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          {/* Logo InovGenius */}
          <div className="pl-3 flex items-center">
            <img 
              src={InovLogo} 
              alt="InovGenius" 
              className="h-8 w-8 rounded-full object-cover"
            />
          </div>

          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Recherchez avec InovGenius..."
            className="flex-1 py-4 px-4 bg-transparent focus:outline-none text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            onFocus={() => query.length > 2 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />

          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-16 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Effacer la recherche"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}

          {/* Bouton recherche vocale */}
          {hasSpeechSupport && (
            <button
              type="button"
              onClick={toggleVoiceSearch}
              className={`p-2 mr-2 rounded-full ${isListening 
                ? 'text-red-500 animate-pulse' 
                : 'text-gray-500 hover:text-blue-600 dark:hover:text-purple-400'
              } transition-colors`}
              aria-label={isListening ? "Arrêter l'écoute" : "Recherche vocale"}
            >
              {isListening ? (
                <SpeakerWaveIcon className="h-5 w-5" />
              ) : (
                <MicrophoneIcon className="h-5 w-5" />
              )}
            </button>
          )}

          <button
            type="submit"
            className="m-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-full hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            aria-label="Rechercher"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <ul className="py-2">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-3 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer flex items-center transition-colors"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 mr-3" />
                <span className="text-gray-800 dark:text-gray-200">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isListening && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-white p-3 rounded-lg flex items-center shadow-md">
          <SpeakerWaveIcon className="h-5 w-5 mr-2 animate-pulse" />
          <span>Parlez maintenant... InovGenius vous écoute</span>
        </div>
      )}
    </div>
  );
};

export default SearchBar;