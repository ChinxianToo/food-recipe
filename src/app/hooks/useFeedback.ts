'use client';

import { useMutation } from '@tanstack/react-query';
import { FeedbackForm } from '../types/recipe';

// Hook for submitting feedback
export function useFeedbackSubmit() {
  return useMutation({
    mutationFn: async (feedback: FeedbackForm): Promise<{ success: boolean; message: string }> => {
      // This is a mock function as TheMealDB API doesn't support submitting feedback
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Feedback submitted:', feedback);
          resolve({
            success: true,
            message: 'Thank you for your feedback!'
          });
        }, 1000);
      });
    }
  });
} 