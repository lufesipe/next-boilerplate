import { updateURLParam } from '.';

const originalLocation = window.location;
const originalHistory = window.history;

describe('URL Utils', () => {
  describe('updateURLParam', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        value: {
          ...originalLocation,
          pathname: '/test-path',
        },
        writable: true,
      });
      window.location.pathname = '/test-path';
      window.history.pushState = jest.fn();
    });

    afterEach(() => {
      window.location = originalLocation as string & Location;
      window.history = originalHistory;
    });

    it('should update URL with the given parameter', () => {
      updateURLParam('query', 'test');
      expect(window.history.pushState).toHaveBeenCalledWith(null, '', '/test-path?query=test');
    });

    it('should handle empty parameter values', () => {
      updateURLParam('filter', '');
      expect(window.history.pushState).toHaveBeenCalledWith(null, '', '/test-path?filter=');
    });

    it('should properly encode special characters in parameter values', () => {
      updateURLParam('search', 'test & query');
      expect(window.history.pushState).toHaveBeenCalledWith(null, '', '/test-path?search=test+%26+query');
    });

    it('should replace existing parameter if called multiple times with the same key', () => {
      updateURLParam('page', '1');

      expect(window.history.pushState).toHaveBeenCalledWith(null, '', '/test-path?page=1');

      jest.clearAllMocks();

      updateURLParam('page', '2');

      expect(window.history.pushState).toHaveBeenCalledWith(null, '', '/test-path?page=2');
    });
  });
});
