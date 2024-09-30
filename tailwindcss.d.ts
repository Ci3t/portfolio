declare module 'tailwindcss/lib/util/flattenColorPalette' {
    // You can define the type for flattenColorPalette based on its usage, here is a generic version
    const flattenColorPalette: (colors: Record<string, string | Record<string, string>>) => Record<string, string>;
    export default flattenColorPalette;
  }
  