import cv2 as cv
import sys

def process_image(image_path):
    # Load the image
    image = cv.imread(image_path)

    gray_image = cv.cvtColor(image, cv.COLOR_BGR2GRAY)
    
    processed_image_path = 'images/output/gray_image.png'
    cv.imwrite(processed_image_path, gray_image)

    return processed_image_path

if __name__ == "__main__":
    image_path = sys.argv[1]
    new_image_path = process_image(image_path=image_path)
    print(new_image_path)



