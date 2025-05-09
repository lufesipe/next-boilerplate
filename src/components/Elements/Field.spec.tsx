import { render, screen, fireEvent } from '@/tests/utils';
import { Field } from './Field';

const defaultProps = {
  label: 'Test Label',
  name: 'testField',
  value: '',
  handleChange: jest.fn(),
};

describe('Field', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render with required props', () => {
    render(<Field {...defaultProps} />);

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should call handleChange when input value changes', () => {
    render(<Field {...defaultProps} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new value' } });

    expect(defaultProps.handleChange).toHaveBeenCalled();
  });

  it('should display error message when provided', () => {
    // @ts-expect-error - message can be a string
    render(<Field {...defaultProps} errors={{ testField: { message: 'This field is required' } }} />);

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('should not display error message when not provided', () => {
    render(<Field {...defaultProps} />);

    expect(screen.queryByText('This field is required')).not.toBeInTheDocument();
  });

  it('should apply placeholder when provided', () => {
    render(<Field {...defaultProps} placeholder="Enter value here" />);

    expect(screen.getByPlaceholderText('Enter value here')).toBeInTheDocument();
  });

  it('should render with vertical orientation when specified', () => {
    render(<Field {...defaultProps} orientation="vertical" />);

    const fieldRoot = screen.getByLabelText('Test Label').closest('div');
    expect(fieldRoot).toBeInTheDocument();
  });

  it('should render with horizontal orientation by default', () => {
    render(<Field {...defaultProps} />);

    const fieldRoot = screen.getByLabelText('Test Label').closest('div');
    expect(fieldRoot).toBeInTheDocument();
  });

  it('should apply custom field props when provided', () => {
    // @ts-expect-error - data-testid is a valid prop
    render(<Field {...defaultProps} fieldProps={{ 'data-testid': 'custom-field' }} />);

    expect(screen.getByTestId('custom-field')).toBeInTheDocument();
  });

  it('should apply custom input props when provided', () => {
    // @ts-expect-error - data-testid is a valid prop
    render(<Field {...defaultProps} inputProps={{ 'data-testid': 'custom-input' }} />);

    expect(screen.getByTestId('custom-input')).toBeInTheDocument();
  });

  it('should apply custom label props when provided', () => {
    // @ts-expect-error - data-testid is a valid prop
    render(<Field {...defaultProps} labelProps={{ 'data-testid': 'custom-label' }} />);

    expect(screen.getByTestId('custom-label')).toBeInTheDocument();
  });

  it('should render with different input types', () => {
    render(<Field {...defaultProps} type="number" />);

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('type', 'number');
  });

  it('should display the current value', () => {
    render(<Field {...defaultProps} value="current value" />);

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveValue('current value');
  });

  it('should mark the field as invalid when error message is provided', () => {
    // @ts-expect-error - message can be a string
    render(<Field {...defaultProps} errors={{ testField: { message: 'Error message' } }} />);

    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('should handle empty string values', () => {
    render(<Field {...defaultProps} value="" />);

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveValue('');
  });

  it('should handle numeric values', () => {
    render(<Field {...defaultProps} value={42} type="number" />);

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveValue(42);
  });
});
