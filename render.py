from PIL import Image
from typing import List
import numpy as np
import pygame

def renderFrame(pixelBuffer: List[List[List[int]]]):
    height: int = len(pixelBuffer)
    width: int = len(pixelBuffer[0])
    running: bool = True

    pygame.init()
    clock = pygame.time.Clock()
 
    screen = pygame.display.set_mode((width, height))
    pygame.display.set_caption('3D Render')

    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        pygame.surfarray.blit_array(screen, pixelBuffer)
        pygame.display.flip()
        clock.tick(60)
    pygame.quit()


def renderImage(pixelBuffer: List[List[List[int]]]):    
    image = Image.fromarray(pixelBuffer)
    image.show()
    image.save(f'{np.random.random() * 100}.jpg', format='JPEG', subsampling=0, quality=95)
    