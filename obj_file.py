from typing import List

def get_obj_data(path: str) -> List[str]:
    f = open(path, 'rt')
    data: List[str] = f.read().split('\n')
    f.close()
    return data

def get_vertices(path: str) -> List[List[float]]:
    data: List[str] = get_obj_data(path)
    data = list(filter(lambda line: line.startswith('v '), data))
    return list(map(lambda line: 
                (list(map(lambda pos: 
                    float(pos), line.strip().split()[1:]))), data))
                    
def get_faces(path: str) -> List[List[int]]:
    data: List[str] = get_obj_data(path)
    data = list(filter(lambda line: line.startswith('f '), data))
    return list(map(lambda line: 
                (list(map(lambda v: 
                    int(v) - 1, line.strip().split()[1:]))), data))