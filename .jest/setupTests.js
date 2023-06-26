global.beforeEach(()=> {
    console.error = jest.fn((...errors) => {
      const errorMessage = errors.join(' ');
      if (errorMessage.includes('An error occurred') || errorMessage.includes('Invalid URL')) {
        return;
      }
    })
});

global.afterEach(() => {
  console.error.mockReset();
});