import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import Header from './Header';

// Mocking the 'useTranslation' hook from 'react-i18next'
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('Header', () => {
  const mockChangeLanguage = jest.fn();

  beforeEach(() => {
    // Mocking the useTranslation hook to return mock t and changeLanguage function
    useTranslation.mockReturnValue({
      t: (key) => key,  // Just return the key for simplicity
      i18n: { changeLanguage: mockChangeLanguage },
    });
  });

  afterEach(() => {
    jest.clearAllMocks(); // Reset mock function calls after each test
  });

  it('renders logo and title', () => {
    render(<Header />);

    // Check that the logo image is rendered correctly
    const logoImage = screen.getByAltText('Centime Logo');
    expect(logoImage).toBeInTheDocument();

    // Check that the title is rendered
    const title = screen.getByText('header.title');
    expect(title).toBeInTheDocument();
  });

  it('displays the correct options in the select dropdown', () => {
    render(<Header />);

    // Check that the "English" and "french" options are displayed in the dropdown
    const englishOption = screen.getByText('language.english');
    const frenchOption = screen.getByText('language.french');

    expect(englishOption).toBeInTheDocument();
    expect(frenchOption).toBeInTheDocument();
  });

  it('renders the correct title based on i18n key', () => {
    render(<Header />);

    // Check that the title text is rendered as 'header.title'
    const title = screen.getByText('header.title');
    expect(title).toBeInTheDocument();
  });
});
