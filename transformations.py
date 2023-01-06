from typing import List
import numpy as np
import math

PRECISION = 5

def translate_x(unit: float, vertices: List[List[float]]) -> List[List[float]]:
    return list(map(lambda v: np.add(v, [unit,0,0]), vertices))

def translate_y(unit: float, vertices: List[List[float]]) -> List[List[float]]:
    return list(map(lambda v: np.add(v, [0,unit,0]), vertices))

def translate_z(unit: float, vertices: List[List[float]]) -> List[List[float]]:
    return list(map(lambda v: np.add(v, [0,0,unit]), vertices))

# def reflect_xy(vertices: List[List[float]]) -> List[List[float]]:
#     reflect_xy_mat = [
#         [1,0,0],
#         [0,1,0],
#         [0,0,-1]
#     ]
#     return list(map(lambda v: np.matmul(reflect_xy_mat, v), vertices))

def reflect_xz(vertices: List[List[float]]) -> List[List[float]]:
    #fixed
    reflect_xz_mat = [
        [1,0,0],
        [0,-1,0],
        [0,0,1]
    ]
    return list(map(lambda v: np.matmul(reflect_xz_mat, v), vertices))

def reflect_yz(vertices: List[List[float]]) -> List[List[float]]:
    reflect_yz_mat = [
        [-1,0,0],
        [0,1,0],
        [0,0,1]
    ]
    return list(map(lambda v: np.matmul(reflect_yz_mat, v), vertices))

def rotate_xy(rad: float, vertices: List[List[float]]) -> List[List[float]]:
    #fixedx2
    rotate_xy_mat = [
        [math.cos(rad), -math.sin(rad), 0],
        [math.sin(rad), math.cos(rad), 0],
        [0, 0, 1]
    ]
    rotate_xy_mat = list(map(lambda row: list(map(lambda entry: round(entry, PRECISION), row)), rotate_xy_mat))
    return list(map(lambda v: np.matmul(rotate_xy_mat, v), vertices))

def rotate_xz(rad: float, vertices: List[List[float]]) -> List[List[float]]:
    #fixedx2
    rotate_xz_mat = [
        [np.cos(rad), 0, -np.sin(rad)],
        [0, 1, 0],
        [np.sin(rad), 0, np.cos(rad)]
    ]
    rotate_xz_mat = list(map(lambda row: list(map(lambda entry: round(entry, PRECISION), row)), rotate_xz_mat))
    return list(map(lambda v: np.matmul(rotate_xz_mat, v), vertices))

def rotate_yz(rad: float, vertices: List[List[float]]) -> List[List[float]]:
    #fixedx2
    rotate_yz_mat = [
        [1, 0, 0],
        [0, math.cos(rad), -math.sin(rad)],
        [0, -math.sin(rad), math.cos(rad)]
    ]
    rotate_yz_mat = list(map(lambda row: list(map(lambda entry: round(entry, PRECISION), row)), rotate_yz_mat))
    
    return list(map(lambda v: np.matmul(rotate_yz_mat, v), vertices))

def scale(factor: float, vertices: List[List[float]]) -> List[List[float]]:
    scale_mat = [
        [factor, 0, 0],
        [0, factor, 0],
        [0, 0, factor]
    ]
    return list(map(lambda v: np.matmul(scale_mat, v), vertices))
    