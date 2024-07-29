
export const IsEmpty = (...values: any[]) => {
  for (const value of values) {
    if (value !== null && value !== 'undefined') {
      const type = typeof(value)
      switch (type) {
        case 'string': 
          if (value.trim && value.trim().length !== 0) {
            return false;
          }
          break;
      }
    }
  }

  return true;
}