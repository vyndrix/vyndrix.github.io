export const Analytics = () => {
  if (process.env.NODE_ENV === "development") return null;

  return (
    <script
      defer
      src="https://cloud.umami.is/script.js"
      data-website-id="1ba6bd2d-b5a3-4fc6-b30a-3cbb29b88f6d"
    />
  );
};
