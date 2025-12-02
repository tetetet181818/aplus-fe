import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import HeroSection from '@/components/organisms/home/HeroSection';

test('tesing landing page comonents and calling api', async () => {
  render(<HeroSection />);
  expect(
    screen.getByText('المكان الأول لبيع وشراء الملخصات الجامعية بكل سهولة')
  ).toBeInTheDocument();
});
