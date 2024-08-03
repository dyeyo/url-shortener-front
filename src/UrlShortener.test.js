import { render, fireEvent, screen } from '@testing-library/react';
import axios from 'axios';
import UrlShortener from './UrlShortener.jsx';

jest.mock('axios');
const { describe, it, expect } = import('@jest/globals');
describe('UrlShortener component', () => {
  it('should set shortenedUrl when a valid URL is submitted', async () => {
    const mockResponse = { data: { shortened_url: 'http://short.url' } };
    axios.post.mockResolvedValue(mockResponse);

    render(<UrlShortener />);

    const input = screen.getByPlaceholderText('Digite la URL');
    fireEvent.change(input, { target: { value: 'http://example.com' } });

    const button = screen.getByText('Generar');
    fireEvent.click(button);

    const shortenedUrl = await screen.findByText('http://short.url');
    expect(shortenedUrl).toBeInTheDocument();
  });

  it('should not call API when URL input is empty', async () => {
    render(<UrlShortener />);

    const button = screen.getByText('Generar');
    fireEvent.click(button);

    expect(axios.post).not.toHaveBeenCalled();
  });
});
