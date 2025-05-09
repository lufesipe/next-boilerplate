import { formatToCurrency } from '.';

describe('Format Utils', () => {
  describe('formatToCurrency', () => {
    it('should format integer to BRL currency', () => {
      const result = formatToCurrency(100);
      expect(result).toBe('R$ 100,00');
    });

    it('should format decimal numbers to BRL currency', () => {
      const result = formatToCurrency(99.99);
      expect(result).toBe('R$ 99,99');
    });

    it('should format zero to BRL currency', () => {
      const result = formatToCurrency(0);
      expect(result).toBe('R$ 0,00');
    });

    it('should format negative numbers to BRL currency', () => {
      const result = formatToCurrency(-50.75);
      expect(result).toBe('-R$ 50,75');
    });

    it('should format large numbers with thousands separators', () => {
      const result = formatToCurrency(1000000);
      expect(result).toBe('R$ 1.000.000,00');
    });

    it('should handle numbers with more than 2 decimal places', () => {
      const result = formatToCurrency(123.456);
      expect(result).toBe('R$ 123,46');
    });

    it('should handle very small decimal values', () => {
      const result = formatToCurrency(0.01);
      expect(result).toBe('R$ 0,01');
    });

    it('should handle very large numbers', () => {
      const result = formatToCurrency(9999999999.99);
      expect(result).toBe('R$ 9.999.999.999,99');
    });
  });
});
