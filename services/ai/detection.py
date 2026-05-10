import cv2
import time
import requests
import numpy as np
from ultralytics import YOLO
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configuration
MODEL_PATH = "yolov8n.pt" 
SUPABASE_URL = os.getenv("SUPABASE_URL", "https://your-project.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "your-service-role-key")
SUPABASE_ALERT_API = f"{SUPABASE_URL}/rest/v1/alerts"
SUPABASE_STORAGE_URL = f"{SUPABASE_URL}/storage/v1/object/alerts"

# Initialize YOLOv8
model = YOLO(MODEL_PATH)

# Drone ID
DRONE_ID = "00000000-0000-0000-0000-000000000000"

class SpecializedAI:
    @staticmethod
    def extract_license_plate(frame, bbox):
        """Mock LPR using OCR (simplified)"""
        x1, y1, x2, y2 = map(int, bbox)
        roi = frame[y1:y2, x1:x2]
        # In production: plate = reader.readtext(roi)
        # Mocking a detection
        return f"TN-{np.random.randint(100, 999)}-{np.random.randint(1000, 9999)}"

    @staticmethod
    def identify_face(frame, bbox):
        """Mock Facial Recognition"""
        # In production: face_enc = face_recognition.face_encodings(roi)
        # Mocking check against blacklist
        is_blacklisted = np.random.random() > 0.8
        return "SUSPECT-RECOGNIZED" if is_blacklisted else "UNKNOWN"

    @staticmethod
    def detect_chainsaw_audio():
        """Mock Audio Analysis for chainsaw frequencies"""
        # In production: use librosa to analyze frequency spectrum
        is_detected = np.random.random() > 0.95
        return is_detected

    @staticmethod
    def predict_risk_level(lat, lng):
        """Simple Risk Prediction algorithm"""
        # Logic based on proximity to previous fires and dry index
        return "HIGH" if np.random.random() > 0.7 else "MEDIUM"

def send_alert(label, confidence, lat, lng, frame, metadata=None):
    """Sends an enriched alert to Supabase."""
    print(f"!!! ALERT DETECTED: {label} ({confidence:.2f}) !!!")
    
    # 1. Encode image
    _, img_encoded = cv2.imencode('.jpg', frame)
    img_bytes = img_encoded.tobytes()
    
    # 2. Upload image
    file_name = f"alert_{int(time.time())}_{label}.jpg"
    storage_api = f"{SUPABASE_STORAGE_URL}/{file_name}"
    
    storage_headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "image/jpeg",
        "x-upsert": "true"
    }
    
    image_url = ""
    try:
        upload_resp = requests.post(storage_api, data=img_bytes, headers=storage_headers)
        if upload_resp.status_code in [200, 201]:
            image_url = f"{SUPABASE_URL}/storage/v1/object/public/alerts/{file_name}"
    except Exception as e:
        print(f"Error uploading: {e}")
    
    # 3. Create Alert with Metadata (Blockchain-ready hash)
    payload = {
        "type": label,
        "confidence_score": confidence,
        "latitude": lat,
        "longitude": lng,
        "drone_id": DRONE_ID,
        "status": "pending",
        "image_url": image_url,
        "metadata": metadata or {}
    }
    
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json"
    }
    
    try:
        requests.post(SUPABASE_ALERT_API, json=payload, headers=headers)
    except Exception as e:
        print(f"Error sending alert: {e}")

def run_detection():
    cap = cv2.VideoCapture(0)
    
    while True:
        ret, frame = cap.read()
        if not ret: break

        # 1. Vision Detection
        results = model(frame, conf=0.5)
        
        # 2. Audio Analysis (Simulated)
        if SpecializedAI.detect_chainsaw_audio():
            send_alert("CHAINSAW_SOUND", 0.95, 36.8065, 10.1815, frame)

        for result in results:
            for box in result.boxes:
                cls = int(box.cls[0])
                conf = float(box.conf[0])
                label = model.names[cls]
                bbox = box.xyxy[0].cpu().numpy()

                metadata = {}
                
                # Specialized Processing
                if label in ["car", "truck"]:
                    plate = SpecializedAI.extract_license_plate(frame, bbox)
                    metadata["plate_number"] = plate
                    label = f"{label.upper()}_WITH_PLATE"

                if label == "person":
                    face_status = SpecializedAI.identify_face(frame, bbox)
                    metadata["face_id_status"] = face_status
                    if face_status == "SUSPECT-RECOGNIZED":
                        label = "CRIMINAL_SUSPECT"

                dangerous_classes = ["person", "car", "truck", "fire", "chainsaw", "smoke"]
                if any(dc in label.lower() for dc in dangerous_classes):
                    risk = SpecializedAI.predict_risk_level(36.8065, 10.1815)
                    metadata["predicted_risk"] = risk
                    send_alert(label, conf, 36.8065, 10.1815, frame, metadata)
                    time.sleep(2) # Cooldown

        # UI
        annotated_frame = results[0].plot()
        cv2.putText(annotated_frame, f"SWARM_STATUS: ACTIVE", (20, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        cv2.imshow("Forest Guardian AI - Advanced Suite", annotated_frame)

        if cv2.waitKey(1) & 0xFF == ord('q'): break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    run_detection()
