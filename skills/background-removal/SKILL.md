---
name: background-removal
description: Remove.bg API integration for processing product photos, headshots, and social assets. Includes file upload, batch processing, and free/paid tier management. Trigger: "remove background", "transparent image", "product photo background", "batch image processing".
version: 1.0.0
license: MIT
---

# Background Removal Skill

## Purpose

This skill provides production integration with the remove.bg API to automatically remove backgrounds from images. Use it to process product photos, headshots, social media assets, and creative materials into transparent PNGs. The API uses AI to detect subjects (person, product, car, animal) and cleanly removes backgrounds.

## When to Use

- **Product catalogs**: Batch remove backgrounds from product photos for e-commerce listings
- **Team headshots**: Process employee photos for websites, directories, reports
- **Social media assets**: Create transparent PNGs for overlaying on social templates
- **Marketing creatives**: Prepare product images for ads, presentations, banners
- **Design mockups**: Create transparent product images for design comps
- **Profile pictures**: Auto-remove backgrounds from user-uploaded avatars
- **Content production**: Batch processing for video backgrounds or overlays

Trigger phrases: "batch remove backgrounds", "product photo cleanup", "transparent PNG", "remove.bg API", "background extraction".

## Key Concepts

### The remove.bg API
**Base endpoint**: `https://api.remove.bg/v1.0/removebg`

**Authentication**: `X-Api-Key` header with your API key (from https://remove.bg/users/sign_up/api)

**Input options**:
- **Image file**: `multipart/form-data` with `image_file` (max 12MB)
- **Image URL**: `image_url` parameter (HTTPS, accessible, max 300MB)
- **Base64 data**: `image_file_b64` parameter

**Output formats**: PNG, JPG, ZIP with JSON data

### Tier & Rate Limits
| Plan | Monthly Calls | Cost | Resolution |
|------|---------------|------|------------|
| Free | 50 | $0 | up to 0.25 MP (375×375px max) |
| Starter | 100 | $0.99 | up to 2.5 MP (1600×1200px) |
| Starter Plus | 500 | $5.99 | up to 2.5 MP |
| Professional | 1,500 | $9.99 | up to 12 MP (4000×3000px) |
| Enterprise | Custom | Custom | No limits |

**Check credits**: GET `/api/get_credits` returns `remaining` credits

### Detection Types
The API auto-detects subject type:
- `person` — human subjects (headshots, full-body, group photos)
- `product` — objects on white/light backgrounds (e-commerce)
- `car` — vehicles (auto, motorcycles)
- `animal` — pets and wildlife
- `other` — fallback for unclear subjects

Use `type` parameter to hint: `&type=person` or `&type=product`

### Output Options
```
format: "auto" | "png" | "jpg" | "zip"
type: "auto" | "person" | "product" | "car" | "animal"
size: "auto" | "small" | "medium" | "large" | "hd" | "full" | "4k"
roi: "0 0 1 1" (region of interest, format: x1 y1 x2 y2, 0-1 scale)
crop: true | false (auto-crop to subject)
type_level: "1" | "2" | "3" (subject accuracy, 1=basic, 3=strict)
bg_blur: "0" to "500" (blur background instead of remove, optional)
scale: "50%" to "100%" (scale up super-resolution, no upscaling artifacts)
```

## Instructions

### Step 1: Get API Key
1. Sign up at https://remove.bg/users/sign_up/api
2. Copy your API key from dashboard
3. Store in `.env` as `REMOVE_BG_API_KEY`

### Step 2: Check Credits
Before batch processing, verify remaining credits:
```bash
curl -s https://api.remove.bg/api/get_credits \
  -H "X-Api-Key: $REMOVE_BG_API_KEY"
```

Response: `{"data":{"credits":{"remaining":45,"limit":50}}}`

### Step 3: Single Image Removal (File Upload)
```bash
curl -s https://api.remove.bg/v1.0/removebg \
  -F "image_file=@product.jpg" \
  -F "size=auto" \
  -F "type=product" \
  -H "X-Api-Key: $REMOVE_BG_API_KEY" \
  -o product_no_bg.png
```

**Options**:
- `-F "image_file=@path/to/image.jpg"` — local file (JPG, PNG, WebP, BMP, 0.1-12 MB)
- `-F "size=auto"` — auto-choose best size (or: small, medium, large, hd, full, 4k)
- `-F "type=product"` — hint subject type (or: person, car, animal, other)
- `-o output.png` — save to file

### Step 4: URL-Based Removal
For images already hosted (faster, no file upload):
```bash
curl -s https://api.remove.bg/v1.0/removebg \
  -F "image_url=https://example.com/product.jpg" \
  -F "size=auto" \
  -H "X-Api-Key: $REMOVE_BG_API_KEY" \
  -o product_no_bg.png
```

### Step 5: Batch Processing Pattern
For 10+ images, use a script to loop and manage credits:

```bash
#!/bin/bash
# batch-remove-backgrounds.sh

API_KEY="$REMOVE_BG_API_KEY"
INPUT_DIR="./input"
OUTPUT_DIR="./output"
mkdir -p "$OUTPUT_DIR"

# Check credits before starting
RESPONSE=$(curl -s https://api.remove.bg/api/get_credits -H "X-Api-Key: $API_KEY")
REMAINING=$(echo "$RESPONSE" | jq -r '.data.credits.remaining')
echo "Starting with $REMAINING credits"

# Process each image
for image in "$INPUT_DIR"/*.jpg "$INPUT_DIR"/*.png; do
  if [ ! -f "$image" ]; then continue; fi

  filename=$(basename "$image" | sed 's/\.[^.]*$//')
  output="$OUTPUT_DIR/${filename}_no_bg.png"

  echo "Processing: $image"
  curl -s https://api.remove.bg/v1.0/removebg \
    -F "image_file=@$image" \
    -F "size=auto" \
    -F "type=product" \
    -H "X-Api-Key: $API_KEY" \
    -o "$output"

  # Check if credit limit reached
  RESPONSE=$(curl -s https://api.remove.bg/api/get_credits -H "X-Api-Key: $API_KEY")
  REMAINING=$(echo "$RESPONSE" | jq -r '.data.credits.remaining')
  echo "  Saved to: $output (Credits remaining: $REMAINING)"

  if [ "$REMAINING" -eq 0 ]; then
    echo "Credit limit reached. Stopping."
    break
  fi

  sleep 0.5  # Rate limiting: don't hammer API
done

echo "Batch processing complete."
```

**Run**:
```bash
chmod +x batch-remove-backgrounds.sh
./batch-remove-backgrounds.sh
```

### Step 6: JavaScript/Node Integration
For web apps or async batch jobs:

```javascript
const removeBackground = async (imageFile) => {
  const formData = new FormData();
  formData.append('image_file', imageFile);
  formData.append('size', 'auto');
  formData.append('type', 'product');

  const response = await fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: {
      'X-Api-Key': process.env.REMOVE_BG_API_KEY,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} - ${response.statusText}`);
  }

  // Return blob for download or preview
  return response.blob();
};

// Usage
const input = document.getElementById('image-upload');
input.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  const blob = await removeBackground(file);

  // Preview
  const url = URL.createObjectURL(blob);
  document.getElementById('preview').src = url;

  // Download
  const a = document.createElement('a');
  a.href = url;
  a.download = `${file.name.split('.')[0]}_no_bg.png`;
  a.click();
});
```

### Step 7: Error Handling
```bash
# Check response for errors
curl -s https://api.remove.bg/v1.0/removebg \
  -F "image_file=@broken.jpg" \
  -H "X-Api-Key: $REMOVE_BG_API_KEY" \
  -w "\nHTTP Status: %{http_code}\n"
```

**Common errors**:
- `400 Bad Request` — Missing/invalid image, unsupported format, wrong parameter
- `402 Payment Required` — No credits remaining
- `403 Forbidden` — Invalid API key
- `413 Payload Too Large` — File exceeds 12MB (or plan limit)
- `429 Too Many Requests` — Rate limited, wait before retrying

## Examples

### Example 1: Product Photo (E-Commerce)
```bash
# Input: jpg of product on white background
curl -s https://api.remove.bg/v1.0/removebg \
  -F "image_file=@shoe.jpg" \
  -F "size=large" \
  -F "type=product" \
  -H "X-Api-Key: sk_YOUR_KEY" \
  -o shoe_transparent.png
```

**Result**: Transparent PNG, product intact, white background removed. Use in e-commerce listings.

### Example 2: Headshot for Team Page
```bash
curl -s https://api.remove.bg/v1.0/removebg \
  -F "image_file=@team_photo.jpg" \
  -F "size=auto" \
  -F "type=person" \
  -F "type_level=2" \
  -H "X-Api-Key: sk_YOUR_KEY" \
  -o team_photo_no_bg.png
```

**Result**: Person extracted cleanly, hair edges refined, transparent background. Layer onto colored background in design.

### Example 3: Batch Social Media Assets (10 product photos)
```bash
#!/bin/bash
for i in {1..10}; do
  curl -s https://api.remove.bg/v1.0/removebg \
    -F "image_file=@product_$i.jpg" \
    -F "size=medium" \
    -F "type=product" \
    -F "bg_color=FFFFFF" \
    -H "X-Api-Key: sk_YOUR_KEY" \
    -o product_${i}_social.png
  sleep 1
done
```

**Result**: 10 transparent PNGs ready for social media overlays.

### Example 4: URL-Based (Remote Image)
```bash
# For image already on CDN (no re-upload)
curl -s https://api.remove.bg/v1.0/removebg \
  -F "image_url=https://cdn.example.com/image.jpg" \
  -F "size=large" \
  -H "X-Api-Key: sk_YOUR_KEY" \
  -o image_no_bg.png
```

**Benefit**: Faster (no file upload), works with streaming/dynamic images.

## Common Pitfalls

### Antipattern 1: Processing Already-Transparent Images
**Bad**: Running PNG with transparency through API wastes credits.
**Good**: Check if image is already transparent (PNG with alpha channel). Use `identify -verbose image.png | grep Alpha` to verify.

### Antipattern 2: Ignoring Output Resolution Limits
**Bad**: Using `size=full` on free tier (limited to 0.25 MP = 375×375px max). Output is tiny.
**Good**: Match `size` parameter to your plan:
- Free: `size=small` (0.25 MP)
- Starter: `size=medium` (2.5 MP)
- Professional: `size=hd` (12 MP)

### Antipattern 3: Not Checking Credits Before Batch
**Bad**: Starting batch of 100 images with only 50 credits remaining. Fails midway.
**Good**: Always check `/api/get_credits` before batch. Calculate: `images_to_process ≤ remaining_credits`.

### Antipattern 4: Wrong Subject Type Hint
**Bad**: Passing `type=product` for a team photo. API struggles with person detection.
**Good**: Choose correct type:
- Headshots, people → `type=person`
- E-commerce items → `type=product`
- Cars, bikes → `type=car`
- Pets, wildlife → `type=animal`
- Unsure → `type=auto` (default)

### Antipattern 5: Not Handling 402 Payment Required
**Bad**: Batch script crashes silently when credits run out.
**Good**: Check HTTP 402 response and gracefully stop:
```bash
if [ "$HTTP_CODE" == "402" ]; then
  echo "No credits remaining. Exiting."
  exit 1
fi
```

### Antipattern 6: Excessive Rate Limiting Without Backoff
**Bad**: Sending 50 requests/sec to API. Gets 429 rate limit error.
**Good**: Add `sleep` between requests and exponential backoff on 429:
```bash
sleep 1  # 1 second between requests
# On 429: sleep 5, then retry
```

### Antipattern 7: Uploading Unnecessarily Large Files
**Bad**: Processing 8MB image when 2MB would suffice. Wastes bandwidth.
**Good**: Optimize input images first:
```bash
# Compress before upload
convert input.jpg -quality 85 -resize 4000x4000 optimized.jpg
curl ... -F "image_file=@optimized.jpg"
```

### Antipattern 8: Ignoring API Error Details
**Bad**: Request fails with 400, but error details ignored. Don't know why.
**Good**: Always check response body:
```bash
curl -s https://api.remove.bg/v1.0/removebg \
  -F "image_file=@image.jpg" \
  -H "X-Api-Key: $KEY" | jq '.'
# Response: {"errors":[{"title":"Request body size exceeded","code":400}]}
```

## References

- **remove.bg API Docs**: https://remove.bg/api
- **API Playground**: https://remove.bg/api/playground
- **Pricing & Plans**: https://remove.bg/pricing
- **Image Processing Best Practices**: https://www.smashingmagazine.com/2021/07/image-optimization/
- **Batch Processing Patterns**: https://aws.amazon.com/articles/batch-processing/
- **Related Skills**: `social-media-design`, `ad-creative-design`
