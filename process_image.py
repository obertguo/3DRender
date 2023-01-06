from typing import List
import numpy as np
import math

def pixel_depth(x: int, y: int, face: List[int], vertices: List[List[float]]) -> float:
    v1 = vertices[face[0]]
    v2 = vertices[face[1]]
    v3 = vertices[face[2]]

    dir1 = np.subtract(v2,v1)
    dir2 = np.subtract(v3,v1)

    normal: List[float] = np.cross(dir1,dir2)
    z = (np.dot(normal, v1) - (normal[0]*x) - (normal[1]*y)) / normal[2]
    return z

def get_face_bounding_box(face: List[int], vertices: List[List[float]]) -> List[int]:
    v1 = vertices[face[0]]
    v2 = vertices[face[1]]
    v3 = vertices[face[2]]
    v_list = [v1,v2,v3]

    x_coords = list(map(lambda v: v[0], v_list))
    y_coords = list(map(lambda v: v[1], v_list))
    return list(map(lambda n: round(n), 
        [min(x_coords), max(x_coords), min(y_coords), max(y_coords)]))

def is_pixel_on_face(x: int, y: int, face: List[int], vertices: List[List[float]]) -> bool:
    v1 = vertices[face[0]]
    v2 = vertices[face[1]]
    v3 = vertices[face[2]]
    p = [x,y,0]

    # recenter so v1 is at origin
    v2 = np.subtract(v2, v1)
    v3 = np.subtract(v3, v1)
    p = np.subtract(p, v1)

    denom = np.linalg.det([
        [v2[0], v3[0]],
        [v2[1], v3[1]]
    ])

    if denom == 0:
        return False
    
    w2 = (p[0]*v3[1] - p[1]*v3[0]) / denom
    w3 = (p[1]*v2[0] - p[0]*v2[1])  / denom

    return (0 <= w2 and w2 <= 1 and 
            0 <= w3 and w3 <= 1 and 
            0 <= w2 + w3 and w2 + w3 <= 1)

def make_pixelbuffer(height: int, width: int, faces: List[List[int]], vertices: List[List[float]], colors: List[List[int]]) -> List[List[List[int]]]:
    pixelbuffer: List[List[List[int]]] = np.zeros((height, width, 3), dtype='uint8') 
    zbuffer: List[List[float]] = np.full((height, width), -math.inf, dtype=np.float32)

    for i, face in enumerate(faces):
        print(f'Rendering face {i+1}/{len(faces)}')
        face_bounding_box = get_face_bounding_box(face, vertices)

        # for row in range(face_bounding_box[2], face_bounding_box[3] + 1):
        #     for col in range(face_bounding_box[0], face_bounding_box[1] + 1):
        #         if is_pixel_on_face(col, row, face, vertices):
        #             if row >= height or col >= width or row < 0 or col < 0: continue
                    
        #             depth = pixel_depth(col, row, face, vertices)
        #             if depth >= zbuffer[row,col]:
        #                 zbuffer[row,col] = depth
        #                 pixelbuffer[row,col] = colors[i]
        
        row = max(face_bounding_box[2],0)
        while row <= min(face_bounding_box[3], height-1):
            col = max(face_bounding_box[0], 0)
            while col <= min(face_bounding_box[1], width-1):
                if is_pixel_on_face(col, row, face, vertices):
                    depth = pixel_depth(col, row, face, vertices)
                    if depth >= zbuffer[row,col]:
                        zbuffer[row,col] = depth
                        pixelbuffer[row,col] = colors[i]
                col += 1
            row += 1

    return pixelbuffer