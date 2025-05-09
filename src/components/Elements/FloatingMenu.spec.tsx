import { render, screen, fireEvent, waitFor } from '@/tests/utils';
import { FloatingMenu } from './FloatingMenu';

const mockItems = [
  { name: 'Edit', handleClick: jest.fn() },
  { name: 'Delete', handleClick: jest.fn() },
  { name: 'View', handleClick: jest.fn() },
];

const defaultProps = {
  children: <button>Open Menu</button>,
  items: mockItems,
};

describe('FloatingMenu', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the trigger button', () => {
    render(<FloatingMenu {...defaultProps} />);

    expect(screen.getByText('Open Menu')).toBeInTheDocument();
  });

  it('should open the menu when trigger is clicked', async () => {
    render(<FloatingMenu {...defaultProps} />);

    fireEvent.click(screen.getByText('Open Menu'));

    await waitFor(() => {
      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
      expect(screen.getByText('View')).toBeInTheDocument();
    });
  });

  it('should call the handleClick function when a menu item is clicked', async () => {
    render(<FloatingMenu {...defaultProps} />);

    fireEvent.click(screen.getByText('Open Menu'));

    await waitFor(() => {
      fireEvent.click(screen.getByText('Edit'));
    });

    expect(mockItems[0].handleClick).toHaveBeenCalledTimes(1);
  });

  it('should render all provided menu items', () => {
    const manyItems = [
      { name: 'Item 1', handleClick: jest.fn() },
      { name: 'Item 2', handleClick: jest.fn() },
      { name: 'Item 3', handleClick: jest.fn() },
      { name: 'Item 4', handleClick: jest.fn() },
      { name: 'Item 5', handleClick: jest.fn() },
    ];

    render(
      <FloatingMenu items={manyItems}>
        <button>Open Menu</button>
      </FloatingMenu>
    );

    fireEvent.click(screen.getByText('Open Menu'));

    manyItems.forEach(async (item) => {
      await waitFor(() => {
        expect(screen.getByText(item.name)).toBeInTheDocument();
      });
    });
  });

  it('should render custom trigger elements', () => {
    render(
      <FloatingMenu items={mockItems}>
        <div data-testid="custom-trigger">Custom Trigger</div>
      </FloatingMenu>
    );

    expect(screen.getByTestId('custom-trigger')).toBeInTheDocument();
  });

  it('should call the correct handler when multiple items are clicked sequentially', async () => {
    render(<FloatingMenu {...defaultProps} />);

    const trigger = screen.getByText('Open Menu');
    fireEvent.click(trigger);

    await waitFor(() => {
      fireEvent.click(screen.getByText('Edit'));
    });

    expect(mockItems[0].handleClick).toHaveBeenCalledTimes(1);
    expect(mockItems[1].handleClick).not.toHaveBeenCalled();
    expect(mockItems[2].handleClick).not.toHaveBeenCalled();

    fireEvent.click(trigger);

    await waitFor(() => {
      fireEvent.click(screen.getByText('Delete'));
    });

    expect(mockItems[0].handleClick).toHaveBeenCalledTimes(1);
    expect(mockItems[1].handleClick).toHaveBeenCalledTimes(1);
    expect(mockItems[2].handleClick).not.toHaveBeenCalled();
  });
});
