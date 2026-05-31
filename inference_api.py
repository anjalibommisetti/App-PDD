import os
import io
import tensorflow as tf
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from PIL import Image
import numpy as np

app = FastAPI(title="Dental Image Classifier")

# -------------------------------------------------
# Load the model – either from the repository or a remote URL
MODEL_PATH = os.getenv("MODEL_PATH", "ml/dental_classifier.h5")
if not os.path.exists(MODEL_PATH):
    # Optional: download from S3 or another storage
    # import urllib.request
    # urllib.request.urlretrieve(os.getenv("MODEL_URL"), MODEL_PATH)
    raise FileNotFoundError(f"Model not found at {MODEL_PATH}")

model = tf.keras.models.load_model(MODEL_PATH)
# Class names must match the training script order
class_names = [
    "Calculus",
    "Caries_Gingivitus_ToothDiscoloration_Ulcer-yolo_annotated-Dataset",
    "Data caries",
    "Gingivitis",
    "Mouth Ulcer",
    "Tooth Discoloration",
    "hypodontia",
]
# -------------------------------------------------

def preprocess_image(img_bytes: bytes, img_size: int = 224) -> np.ndarray:
    img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
    img = img.resize((img_size, img_size))
    arr = np.array(img) / 255.0
    return np.expand_dims(arr, axis=0)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if file.content_type not in {"image/jpeg", "image/png"}:
        raise HTTPException(status_code=415, detail="Unsupported image type")
    content = await file.read()
    x = preprocess_image(content)
    probs = model.predict(x)[0]
    idx = int(np.argmax(probs))
    return JSONResponse(
        content={
            "predicted_class": class_names[idx],
            "probability": float(probs[idx]),
            "all_probabilities": {c: float(p) for c, p in zip(class_names, probs)},
        }
    )
