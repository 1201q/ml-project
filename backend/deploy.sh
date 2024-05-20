gcloud \
  beta functions \
  deploy predict_mnist \
  --runtime python37 \
  --trigger-http \
  --project master-strange \
  --region asia-northeast1
