import logoLight from "./pauline-logo-light.svg";
import logoDark from "./pauline-logo-dark.svg";

export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <h1 className="sr-only">
            Pauline Roussel - Yoga Prénatal et Accompagnement à la Naissance
          </h1>
          <div className="w-[500px] max-w-[100vw] p-4">
            <img
              src={logoLight}
              alt=""
              aria-hidden="true"
              className="block w-full dark:hidden"
            />
            <img
              src={logoDark}
              alt=""
              aria-hidden="true"
              className="hidden w-full dark:block"
            />
          </div>
        </header>
        <div className="max-w-[300px] w-full space-y-6 px-4">
          <nav className="rounded-3xl border border-primary-500 p-6 dark:border-secondary-500 space-y-4 bg-soft-50 dark:bg-neutral-800">
            <p className="leading-6 text-neutral-500 dark:text-neutral-200 text-center">
              Que souhaitez-vous découvrir ?
            </p>
            <ul>
              {services.map(({ href, text, icon }) => (
                <li key={href}>
                  <a
                    className="group flex items-center gap-3 self-stretch p-3 leading-normal text-accent-500 hover:underline dark:text-accent-300"
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {icon}
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </main>
  );
}

const services = [
  {
    href: "#yoga-prenatal",
    text: "Yoga Prénatal",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="stroke-primary-500 group-hover:stroke-current dark:stroke-success-200"
      >
        <path
          d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5V9M21 16V20C21 21.1 20.1 22 19 22H5C3.9 22 3 21.1 3 20V16L21 16ZM10 8.5C11.11 8.56 12.56 9.19 12.56 9.19L15.22 18H16.9V20L7.1 20V18H8.78L10 8.5Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "#accompagnement",
    text: "Accompagnement à la Naissance",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="stroke-primary-500 group-hover:stroke-current dark:stroke-success-200"
      >
        <path
          d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "#consultations",
    text: "Consultations Bien-être",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="stroke-primary-500 group-hover:stroke-current dark:stroke-success-200"
      >
        <path
          d="M9 11H15L13 13.5L15 16H9L11 13.5L9 11ZM12 2L13.09 8.26L22 9L13.09 9.74L12 2ZM12 2L10.91 8.26L2 9L10.91 9.74L12 2Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "#mama-blessings",
    text: "Mama Blessings",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="stroke-primary-500 group-hover:stroke-current dark:stroke-success-200"
      >
        <path
          d="M12 3L14 8H19L15.5 11.5L17 17L12 14L7 17L8.5 11.5L5 8H10L12 3Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];
