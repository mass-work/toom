// PdfViewer.jsx

import React, { useEffect, useRef } from 'react';
import { getDocument } from 'pdfjs-dist/webpack';

const PdfViewer = ({ pdfUrl, color }) => {
  const canvasRef = useRef();

  const changeColor = (canvas, context, color) => {
    const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      if ((r + g + b) < 650) {
        data[i] = color.r;
        data[i + 1] = color.g;
        data[i + 2] = color.b;
      }
    }

    context.putImageData(imgData, 0, 0);
  };

  useEffect(() => {
    const renderPdfAsImage = async () => {
      if (!pdfUrl) return;

      const loadingTask = getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1 });

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext);

      const img = new Image();
      img.src = canvas.toDataURL();
      img.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0);

        if (color) {
          changeColor(canvas, context, color);
        }
      };
    };

    renderPdfAsImage();
  }, [pdfUrl, color]);

  return <canvas ref={canvasRef}></canvas>;
};

export default PdfViewer;
