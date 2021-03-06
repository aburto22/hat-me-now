module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontWeight: {
        "light-normal": 350,
      },
      maxWidth: {
        "nav-link": "6rem",
      },
      spacing: {
        104: "26rem",
      },
      colors: {
        blue: {
          disabled: "#73BAD3",
          "primary-light": "#0D9ACE",
          "active-link": "#007eac",
          primary: "#0C5F79",
          hover: "#40A8CE",
        },
        gray: {
          body: "#fdfdfd",
          light: "#ededed",
          mid: "#D4D4D4",
          primary: "#3F3F46",
          skeleton: "#dbdbdb",
        },
      },
      backgroundImage: {
        "body-pattern": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='32' viewBox='0 0 16 32'%3E%3Cg fill='%2392a7ac' fill-opacity='0.11'%3E%3Cpath fill-rule='evenodd' d='M0 24h4v2H0v-2zm0 4h6v2H0v-2zm0-8h2v2H0v-2zM0 0h4v2H0V0zm0 4h2v2H0V4zm16 20h-6v2h6v-2zm0 4H8v2h8v-2zm0-8h-4v2h4v-2zm0-20h-6v2h6V0zm0 4h-4v2h4V4zm-2 12h2v2h-2v-2zm0-8h2v2h-2V8zM2 8h10v2H2V8zm0 8h10v2H2v-2zm-2-4h14v2H0v-2zm4-8h6v2H4V4zm0 16h6v2H4v-2zM6 0h2v2H6V0zm0 24h2v2H6v-2z'/%3E%3C/g%3E%3C/svg%3E");`,
      },
      screens: {
        mobile: "40em",
        tablet: "48em",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
