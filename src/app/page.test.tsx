import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ListingPage from './page';

describe('Airbnb Listing Flow: Main View -> Photo Tour -> Lightbox & Hotkeys', () => {
  it('should complete the entire modal navigation flow and keyboard hotkeys', async () => {
    // 1. Initial Render: Main Listing View
    render(<ListingPage />);

    expect(screen.getByText('Romantic Jacuzzi 1BHK Candolim | Miraahya UG10')).toBeDefined();
    
    // Check that 'Show all photos' overlay button is present
    const showAllPhotosBtn = screen.getByRole('button', { name: /show all photos/i });
    expect(showAllPhotosBtn).toBeDefined();

    // 2. Click 'Show all photos' -> Should open Photo Tour Modal
    fireEvent.click(showAllPhotosBtn);

    // Verify Photo Tour Modal is open
    expect(screen.getByText(/Photo tour · Romantic Jacuzzi 1BHK Candolim/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /all rooms/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /living room 1/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /bedroom/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /pool/i })).toBeDefined();

    // 3. Click an individual photo to test the Lightbox modal
    const openLightboxLinks = screen.getAllByText(/Open Lightbox/i);
    expect(openLightboxLinks.length).toBeGreaterThan(0);
    fireEvent.click(openLightboxLinks[0]);

    // Verify Lightbox Modal is open with dark backdrop and photo counter
    expect(screen.getByText('Back to Tour')).toBeDefined();
    // Default initial photo should show index 1 of 12
    expect(screen.getByText('1')).toBeDefined();
    expect(screen.getByText('12')).toBeDefined();

    // 4. Test Keyboard Hotkeys:
    // Test ArrowRight -> cycle to photo 2
    fireEvent.keyDown(window, { key: 'ArrowRight', code: 'ArrowRight' });
    expect(screen.getByText('2')).toBeDefined();

    // Test ArrowRight again -> cycle to photo 3
    fireEvent.keyDown(window, { key: 'ArrowRight', code: 'ArrowRight' });
    expect(screen.getByText('3')).toBeDefined();

    // Test ArrowLeft -> cycle back to photo 2
    fireEvent.keyDown(window, { key: 'ArrowLeft', code: 'ArrowLeft' });
    expect(screen.getByText('2')).toBeDefined();

    // Test Escape key -> returns to Photo Tour modal
    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });

    // Verify that we returned to the Photo Tour Modal
    expect(screen.getByText(/Photo tour · Romantic Jacuzzi 1BHK Candolim/i)).toBeDefined();
    expect(screen.queryByText('Back to Tour')).toBeNull();

    // 5. Test Back button on Photo Tour Modal -> returns to Main Listing View
    const backToMainBtn = screen.getByLabelText(/Back to main listing/i);
    fireEvent.click(backToMainBtn);

    // Verify we are back on the main listing page
    expect(screen.getByRole('button', { name: /show all photos/i })).toBeDefined();
  });
});
