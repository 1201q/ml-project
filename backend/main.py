import face_recognition
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.wsgi import WSGIMiddleware
from PIL import Image

app = FastAPI()

# uvicorn main:app --reload


@app.post("/detect/isface")
async def detect_isface(file: UploadFile = File(...)):
    try:
        image = face_recognition.load_image_file(file.file)
        face_encodings = face_recognition.face_encodings(image)
        is_contain_face = bool(face_encodings)

        return {
            "isFace": is_contain_face,
            "message": (
                "이미지에 얼굴이 있습니다."
                if is_contain_face
                else "이미지에 얼굴이 없습니다."
            ),
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# if __name__ == "__main__":
#     import uvicorn

#     uvicorn.run(app, host="0.0.0.0", port=8000)


def app_function(request):
    return WSGIMiddleware(app)(request)
