import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ContactForm } from "~/components/layout/contact";

/**
 * Mock Date.now to ensure the anti-spam time-check always passes in tests.
 * The first call returns a base timestamp (simulating first interaction),
 * and subsequent calls return base + 5000ms (well above the 3s threshold).
 */
function mockDateNowForFormTests() {
  const baseTime = 1000000;
  let callCount = 0;
  return vi.spyOn(Date, "now").mockImplementation(() => {
    callCount++;
    // First call records the interaction timestamp; subsequent calls
    // (at submit time) simulate 5 seconds of elapsed time.
    return callCount === 1 ? baseTime : baseTime + 5000;
  });
}

describe("ContactForm Component", () => {
  let dateNowSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    dateNowSpy = mockDateNowForFormTests();
  });

  afterEach(() => {
    dateNowSpy.mockRestore();
  });

  describe("Rendering", () => {
    it("should render all form fields", () => {
      render(<ContactForm />);

      expect(screen.getByLabelText(/nom/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/plage horaire/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /envoyer/i })
      ).toBeInTheDocument();
    });

    it("should render placeholders correctly", () => {
      render(<ContactForm />);

      expect(screen.getByPlaceholderText("John Appleseed")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("example@email.com")
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Message")).toBeInTheDocument();
    });

    it("should render all availability options", () => {
      render(<ContactForm />);

      const select = screen.getByLabelText(/plage horaire/i);
      expect(select).toBeInTheDocument();
      expect(screen.getByText("Flexible")).toBeInTheDocument();
      expect(screen.getByText("Matin (9h-12h)")).toBeInTheDocument();
      expect(screen.getByText("Après-midi (12h-17h)")).toBeInTheDocument();
      expect(screen.getByText("Soir (17h-20h)")).toBeInTheDocument();
    });
  });

  describe("Validation", () => {
    it("should show error when name is too short", async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/nom/i);
      const submitButton = screen.getByRole("button", { name: /envoyer/i });

      await user.type(nameInput, "A");
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/nom doit contenir au moins 2 caractères/i)
        ).toBeInTheDocument();
      });
    });

    it("should show error when email is invalid", async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      const emailInput = screen.getByLabelText(/email/i);
      const submitButton = screen.getByRole("button", { name: /envoyer/i });

      await user.type(emailInput, "invalid-email");
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/veuillez entrer une adresse courriel valide/i)
        ).toBeInTheDocument();
      });
    });

    it("should show error when message is too short", async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      const messageInput = screen.getByLabelText(/message/i);
      const submitButton = screen.getByRole("button", { name: /envoyer/i });

      await user.type(messageInput, "Short");
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/message doit contenir au moins 10 caractères/i)
        ).toBeInTheDocument();
      });
    });

    it("should not show errors when all fields are valid", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(<ContactForm onSubmit={onSubmit} />);

      const nameInput = screen.getByLabelText(/nom/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);
      const submitButton = screen.getByRole("button", { name: /envoyer/i });

      await user.type(nameInput, "John Doe");
      await user.type(emailInput, "john@example.com");
      await user.type(messageInput, "This is a valid message");
      await user.click(submitButton);

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith({
          name: "John Doe",
          email: "john@example.com",
          availability: "",
          message: "This is a valid message",
        });
      });
    });
  });

  describe("Form Submission", () => {
    it("should call onSubmit with form data", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(<ContactForm onSubmit={onSubmit} />);

      await user.type(screen.getByLabelText(/nom/i), "Jane Smith");
      await user.type(screen.getByLabelText(/email/i), "jane@example.com");
      await user.selectOptions(
        screen.getByLabelText(/plage horaire/i),
        "morning"
      );
      await user.type(
        screen.getByLabelText(/message/i),
        "I would like to book a prenatal yoga session"
      );
      await user.click(screen.getByRole("button", { name: /envoyer/i }));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith({
          name: "Jane Smith",
          email: "jane@example.com",
          availability: "morning",
          message: "I would like to book a prenatal yoga session",
        });
      });
    });

    it("should show success message after submission", async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      await user.type(screen.getByLabelText(/nom/i), "John Doe");
      await user.type(screen.getByLabelText(/email/i), "john@example.com");
      await user.type(
        screen.getByLabelText(/message/i),
        "This is a test message"
      );
      await user.click(screen.getByRole("button", { name: /envoyer/i }));

      await waitFor(() => {
        expect(
          screen.getByText(/merci pour votre message/i)
        ).toBeInTheDocument();
      });
    });

    it("should reset form after successful submission", async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/nom/i) as HTMLInputElement;
      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
      const messageInput = screen.getByLabelText(/message/i) as HTMLTextAreaElement;

      await user.type(nameInput, "John Doe");
      await user.type(emailInput, "john@example.com");
      await user.type(messageInput, "This is a test message");
      await user.click(screen.getByRole("button", { name: /envoyer/i }));

      await waitFor(() => {
        expect(nameInput.value).toBe("");
        expect(emailInput.value).toBe("");
        expect(messageInput.value).toBe("");
      });
    });

    it("should display loading state when isLoading is true", () => {
      render(<ContactForm isLoading={true} />);

      expect(
        screen.getByRole("button", { name: /envoi en cours/i })
      ).toBeDisabled();
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA labels", () => {
      render(<ContactForm />);

      expect(screen.getByLabelText(/nom/i)).toHaveAttribute("id");
      expect(screen.getByLabelText(/email/i)).toHaveAttribute("id");
      expect(screen.getByLabelText(/plage horaire/i)).toHaveAttribute("id");
      expect(screen.getByLabelText(/message/i)).toHaveAttribute("id");
    });

    it("should have role=alert for success message", async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      await user.type(screen.getByLabelText(/nom/i), "John Doe");
      await user.type(screen.getByLabelText(/email/i), "john@example.com");
      await user.type(
        screen.getByLabelText(/message/i),
        "This is a test message"
      );
      await user.click(screen.getByRole("button", { name: /envoyer/i }));

      await waitFor(() => {
        const alert = screen.getByRole("alert");
        expect(alert).toBeInTheDocument();
        expect(alert).toHaveAttribute("aria-live", "polite");
      });
    });

    it("should support keyboard navigation", async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/nom/i);
      const emailInput = screen.getByLabelText(/email/i);
      const availabilityInput = screen.getByLabelText(/plage horaire/i);
      const messageInput = screen.getByLabelText(/message/i);
      const submitButton = screen.getByRole("button", { name: /envoyer/i });

      // Tab through form fields
      await user.tab();
      expect(nameInput).toHaveFocus();

      await user.tab();
      expect(emailInput).toHaveFocus();

      await user.tab();
      expect(availabilityInput).toHaveFocus();

      await user.tab();
      expect(messageInput).toHaveFocus();

      await user.tab();
      expect(submitButton).toHaveFocus();
    });
  });

  describe("French Content", () => {
    it("should display all labels in French", () => {
      render(<ContactForm />);

      expect(screen.getByLabelText(/nom/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/plage horaire/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /envoyer/i })
      ).toBeInTheDocument();
    });
  });

  describe("Anti-spam Security", () => {
    it("should sanitize name and message before calling onSubmit", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(<ContactForm onSubmit={onSubmit} />);

      await user.type(
        screen.getByLabelText(/nom/i),
        "John <script>alert</script>"
      );
      await user.type(screen.getByLabelText(/email/i), "john@example.com");
      await user.type(
        screen.getByLabelText(/message/i),
        "Hello <b>world</b> this is a test"
      );
      await user.click(screen.getByRole("button", { name: /envoyer/i }));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            name: "John alert",
            message: "Hello world this is a test",
          })
        );
      });
    });

    it("should silently reject submission when honeypot is filled", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(<ContactForm onSubmit={onSubmit} />);

      await user.type(screen.getByLabelText(/nom/i), "John Doe");
      await user.type(screen.getByLabelText(/email/i), "john@example.com");
      await user.type(
        screen.getByLabelText(/message/i),
        "This is a valid message"
      );

      // Fill the honeypot field (bots would do this)
      const honeypotInput = document.getElementById("website") as HTMLInputElement;
      await user.type(honeypotInput, "http://spam.com");

      await user.click(screen.getByRole("button", { name: /envoyer/i }));

      await waitFor(() => {
        // Should show success (fake) but not call onSubmit
        expect(
          screen.getByText(/merci pour votre message/i)
        ).toBeInTheDocument();
        expect(onSubmit).not.toHaveBeenCalled();
      });
    });

    it("should silently reject submission when submitted too fast", async () => {
      // Override the default mock to simulate immediate submission
      dateNowSpy.mockRestore();
      const fixedTime = 1000000;
      dateNowSpy = vi.spyOn(Date, "now").mockReturnValue(fixedTime);

      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(<ContactForm onSubmit={onSubmit} />);

      await user.type(screen.getByLabelText(/nom/i), "John Doe");
      await user.type(screen.getByLabelText(/email/i), "john@example.com");
      await user.type(
        screen.getByLabelText(/message/i),
        "This is a valid message"
      );
      await user.click(screen.getByRole("button", { name: /envoyer/i }));

      await waitFor(() => {
        // Should show success (fake) but not call onSubmit
        expect(
          screen.getByText(/merci pour votre message/i)
        ).toBeInTheDocument();
        expect(onSubmit).not.toHaveBeenCalled();
      });
    });
  });
});
