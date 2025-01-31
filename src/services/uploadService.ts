export const uploadPdf = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://localhost:8000/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Błąd podczas przesyłania pliku.");
  }

  return response.json();
};
