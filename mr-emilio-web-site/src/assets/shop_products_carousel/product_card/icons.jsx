export const ArrowIcon = ({ direction = "right" }) => {
  const isLeft = direction === "left";

  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={isLeft ? "M15 18L9 12L15 6" : "M9 18L15 12L9 6"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CartIcon = () => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{
        display: "block",
        flexShrink: 0,
      }}
    >
      <g transform="translate(0,-1)">
        <path
          d="M3.5 4.5H5.5L7.2 15.2C7.3 15.9 7.9 16.4 8.6 16.4H17.6C18.3 16.4 18.9 15.9 19 15.2L20.2 8H6.1"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle
          cx="9.2"
          cy="19.2"
          r="1.2"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <circle
          cx="17.3"
          cy="19.2"
          r="1.2"
          stroke="currentColor"
          strokeWidth="1.7"
        />
      </g>
    </svg>
  );
};

export const BenefitIcon = ({ type }) => {
  if (type === "snowflake") {
    return (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 2V22M4.2 6.5L19.8 17.5M4.2 17.5L19.8 6.5M8.5 4L12 7.5L15.5 4M8.5 20L12 16.5L15.5 20M3.5 10L8 12L3.5 14M20.5 10L16 12L20.5 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "clock") {
    return (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="8.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />

        <path
          d="M12 7.5V12L15.2 14"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "heart") {
    return (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="venezuela-heart-gradient"
            x1="12"
            y1="3"
            x2="12"
            y2="21"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#F4D000" />
            <stop offset="33.33%" stopColor="#F4D000" />

            <stop offset="33.34%" stopColor="#1646AC" />
            <stop offset="66.66%" stopColor="#1646AC" />

            <stop offset="66.67%" stopColor="#CF142B" />
            <stop offset="100%" stopColor="#CF142B" />
          </linearGradient>
        </defs>

        <path
          d="M20.8 4.8C18.7 2.7 15.3 2.7 13.2 4.8L12 6L10.8 4.8C8.7 2.7 5.3 2.7 3.2 4.8C1.1 6.9 1.1 10.3 3.2 12.4L12 21L20.8 12.4C22.9 10.3 22.9 6.9 20.8 4.8Z"
          fill="url(#venezuela-heart-gradient)"
        />
      </svg>
    );
  }

  if (type === "scale") {
    return (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 4V19M7 20H17M5 7H19M7 7L4 13H10L7 7ZM17 7L14 13H20L17 7Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 7.5L12 4L19 7.5V16.5L12 20L5 16.5V7.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="M5 7.5L12 11L19 7.5M12 11V20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const HeartIcon = ({ filled = false }) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      aria-hidden="true"
    >
      <path
        d="M20.8 4.8C18.7 2.7 15.3 2.7 13.2 4.8L12 6L10.8 4.8C8.7 2.7 5.3 2.7 3.2 4.8C1.1 6.9 1.1 10.3 3.2 12.4L12 21L20.8 12.4C22.9 10.3 22.9 6.9 20.8 4.8Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const StarIcon = ({ filled }) => {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2.75L14.86 8.55L21.26 9.48L16.63 13.99L17.72 20.37L12 17.36L6.28 20.37L7.37 13.99L2.74 9.48L9.14 8.55L12 2.75Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};
