import '@testing-library/jest-dom';

// ✅ Only run this if HTMLCanvasElement exists
if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.getContext = () => {
    return {
      fillRect: jest.fn(),
      clearRect: jest.fn(),
      getImageData: jest.fn(),
      putImageData: jest.fn(),
      createImageData: jest.fn(),
      setTransform: jest.fn(),
      drawImage: jest.fn(),
      save: jest.fn(),
      fillText: jest.fn(),
      restore: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      closePath: jest.fn(),
      stroke: jest.fn(),
      strokeRect: jest.fn(),
      measureText: jest.fn().mockReturnValue({ width: 0 }),
      arc: jest.fn(),
      fill: jest.fn(),
      canvas: document.createElement('canvas'),
    };
  };
}
