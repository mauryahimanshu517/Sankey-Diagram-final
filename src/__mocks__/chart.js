export const Chart = jest.fn().mockImplementation(() => ({
    destroy: jest.fn(),
  }));
  
  Chart.register = jest.fn(); // ✅ mock .register() method explicitly
  
  export const registerables = [];
  