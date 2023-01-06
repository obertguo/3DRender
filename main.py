from PIL import Image
import numpy 
from typing import List
from render import *
from process_image import * 
from transformations import *
from obj_file import *

HEIGHT = 768
WIDTH = 1366
SCALE = 80

path = 'teapot.obj'
faces = get_faces(path)
vertices = get_vertices(path)
colors: List[List[int]] = []
for i in range(len(faces)):
    colors.append(list(np.random.random(size=3) * 256))
    # colors.append([0,255,255])


#vertices = rotate_xy(10 * math.pi/180, vertices)
vertices = rotate_yz(30 * math.pi/180, vertices)
#vertices = rotate_xz(30 * math.pi/180, vertices)

print(np.matrix(vertices))

vertices = scale(SCALE, vertices)
vertices = reflect_xz(vertices)
vertices = translate_y(HEIGHT/2, translate_x(WIDTH/2, vertices))

pixelbuffer = make_pixelbuffer(HEIGHT, WIDTH, faces, vertices, colors)
renderImage(pixelbuffer)
# renderFrame(pixelbuffer)
