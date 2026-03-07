declare module '*&format=webp' {
  const src: string;
  export default src;
}

declare module '*&format=avif' {
  const src: string;
  export default src;
}

// Support for width parameters
declare module '*&w=*' {
  const src: string;
  export default src;
}

// Support for srcset generation
declare module '*&as=srcset' {
  const src: string;
  export default src;
}

// Support for combined width + format + srcset
declare module '*&w=*&format=*&as=srcset' {
  const src: string;
  export default src;
}
