import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import Header from './Header';


jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('Header', () => {
  const mockChangeLanguage = jest.fn();

  beforeEach(() => {
    
    useTranslation.mockReturnValue({
      t: (key) => key,  
      i18n: { changeLanguage: mockChangeLanguage },
    });
  });

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('renders logo and title', () => {
    render(<Header />);


    const logoImage = screen.getByAltText('Centime Logo');
    expect(logoImage).toBeInTheDocument();

    const title = screen.getByText('header.title');
    expect(title).toBeInTheDocument();
  });

  it('displays the correct options in the select dropdown', () => {
    render(<Header />);

    
    const englishOption = screen.getByText('language.english');
    const frenchOption = screen.getByText('language.french');

    expect(englishOption).toBeInTheDocument();
    expect(frenchOption).toBeInTheDocument();
  });

  it('renders the correct title based on i18n key', () => {
    render(<Header />);

   
    const title = screen.getByText('header.title');
    expect(title).toBeInTheDocument();
  });
});
