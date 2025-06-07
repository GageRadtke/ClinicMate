import { render, screen } from "@testing-library/react";
import AppointmentForm from "../components/AppointmentForm";

test("AppointmentForm has Book button", () => {
  render(<AppointmentForm onSuccess={() => {}} />);
  const buttonElement = screen.getByText(/Book/i);
  expect(buttonElement).toBeInTheDocument();
});
