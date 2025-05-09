import { render, screen, fireEvent, waitFor } from '@/tests/utils';
import { Dialog } from './Dialog';

describe('Dialog', () => {
  it('should render a trigger button', () => {
    render(
      <Dialog button={<button>Open Dialog</button>}>
        <div>Dialog Content</div>
      </Dialog>
    );

    expect(screen.getByText('Open Dialog')).toBeInTheDocument();
  });

  it('should open the dialog when the button is clicked', async () => {
    render(
      <Dialog button={<button>Open Dialog</button>}>
        <div>Dialog Content</div>
      </Dialog>
    );

    fireEvent.click(screen.getByText('Open Dialog'));

    await waitFor(() => {
      expect(screen.getByText('Dialog Content')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });
  });

  it('should render the title when provided', async () => {
    render(
      <Dialog button={<button>Open Dialog</button>} title="Test Dialog Title">
        <div>Dialog Content</div>
      </Dialog>
    );

    fireEvent.click(screen.getByText('Open Dialog'));

    await waitFor(() => {
      expect(screen.getByText('Test Dialog Title')).toBeInTheDocument();
      expect(screen.queryByRole('heading')).toBeInTheDocument();
    });
  });

  it('should not render the header when title is not provided', async () => {
    render(
      <Dialog button={<button>Open Dialog</button>}>
        <div>Dialog Content</div>
      </Dialog>
    );

    fireEvent.click(screen.getByText('Open Dialog'));

    await waitFor(() => {
      expect(screen.getByText('Dialog Content')).toBeInTheDocument();
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });
  });

  it('should render the footer when provided', async () => {
    render(
      <Dialog button={<button>Open Dialog</button>} footer={<button>Submit</button>}>
        <div>Dialog Content</div>
      </Dialog>
    );

    fireEvent.click(screen.getByText('Open Dialog'));

    await waitFor(() => {
      expect(screen.getByText('Submit')).toBeInTheDocument();
    });
  });

  it('should apply custom content props when provided', async () => {
    render(
      // @ts-expect-error - data-testid is a valid prop
      <Dialog button={<button>Open Dialog</button>} contentProps={{ 'data-testid': 'custom-dialog' }}>
        <div>Dialog Content</div>
      </Dialog>
    );

    fireEvent.click(screen.getByText('Open Dialog'));

    await waitFor(() => {
      expect(screen.getByTestId('custom-dialog')).toBeInTheDocument();
    });
  });

  it('should close the dialog when close button is clicked', async () => {
    render(
      <Dialog button={<button>Open Dialog</button>}>
        <div>Dialog Content</div>
      </Dialog>
    );

    fireEvent.click(screen.getByText('Open Dialog'));

    await waitFor(() => {
      expect(screen.getByText('Dialog Content')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    await waitFor(() => {
      expect(screen.queryByText('Dialog Content')).toBeNull();
    });
  });
});
