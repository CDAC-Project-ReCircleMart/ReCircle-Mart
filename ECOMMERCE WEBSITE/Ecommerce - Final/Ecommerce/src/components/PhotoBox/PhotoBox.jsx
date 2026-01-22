export default function PhotoBox({ index, photos, setPhotos }) {
  const handleSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const updated = [...photos];
    updated[index] = {
      file,
      preview: URL.createObjectURL(file),
    };
    setPhotos(updated);
  };

  const removePhoto = () => {
    const updated = [...photos];
    updated[index] = null;
    setPhotos(updated);
  };

  const photo = photos[index];

  return (
    <div className="photo-slot">
      {photo ? (
        <>
          <img src={photo.preview} alt="preview" />
          <button className="remove-btn" onClick={removePhoto}>
            ✕
          </button>
        </>
      ) : (
        <label className="add-photo">
          <input type="file" accept="image/*" hidden onChange={handleSelect} />
          <span className="plus">📷</span>
          <span>Add Photo</span>
        </label>
      )}
    </div>
  );
}
