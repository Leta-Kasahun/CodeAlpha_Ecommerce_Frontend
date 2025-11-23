/* Declarations for Tailwind plugins without TypeScript types.
   Place this file under src/types/ (or update tsconfig include to include src/types).
*/

declare module "@tailwindcss/forms" {
  const plugin: any;
  export default plugin;
}

declare module "tailwindcss-animate" {
  const plugin: any;
  export default plugin;
}