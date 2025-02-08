import { useTheme } from "../context/ThemeProvider"; // Make sure to import useTheme

const Footer = () => {
  const { theme } = useTheme(); // Access the current theme from context

  return (
    <div
      className={`${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      } text-center py-8`} // Conditional class based on the theme
    >
      Created by{" "}
      <a
        href="https://hritik-sharma-portfolio.vercel.app/"
        className="underline text-blue-500">
        Hritik Sharma
      </a>
    </div>
  );
};

export default Footer;
