# This file is part of deep.dance.

# deep.dance is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.

# deep.dance is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.

# You should have received a copy of the GNU General Public License
# along with deep.dance.  If not, see <https://www.gnu.org/licenses/>.

import os
import argparse
import numpy as np
import random
import json

import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D


def get_parser():
    parser = argparse.ArgumentParser(
        description="Export generated keypoint sequence as JSON file.")
    
    parser.add_argument('file',
        help='Input file containing keypoint sequence as serialized numpy array.')
    
    return parser

def load_data(file):
    input = np.load(file)
    for item in input.files:
        print("Found \"{}\" with shape {}".format(
            item, input[item].shape))   
    return input 

def init_data():
    data = {}
    data['frames'] = {}
    data['positions'] = {}
    return data

def add_bones(data):
    data['bones'] = {
        'rightLeg': [0,1,2,3],
        'leftLeg' : [0,4,5,6],
        'spine': [0,7,8],
        'rightArm':[8,14,15,16],
        'leftArm':[8,11,12,13],
        'head':[8,9,10]
    }
    return data

def add_keypoints(data, keypoints, frame):
    data['frames'][frame] = []
    for point in keypoints:
        data['frames'][frame].append([point[0].astype(float), point[1].astype(float), point[2].astype(float)])
    return data

def add_mapped_positions(data, frame):
    """
    Currently we have a combined LED strip containing 120 LEDs,
    6 strips with 20 LEDs each. Since the DMX animation will be
    implemented in the "view" component, we'll only update the position
    every second.
    """
    point = data['frames'][frame][6]
    if frame % 25 == 0:
        y = round(abs(point[1].astype(float) * 120))
        data['positions'][frame] = []
        data['positions'][frame].append(y)
    return data

def write_json(data, dir, base):
    output = dir + '/' + base + '.json'
    with open(output, 'w') as outfile:
        print("Writing JSON output to", output)
        json.dump(data, outfile)

if __name__ == '__main__':
    args = get_parser().parse_args()

    if args.file:
        file = os.path.abspath(args.file)
        dir = os.path.dirname(file)
        name = os.path.basename(file)
        base = os.path.splitext(name)[0]
        currentFrame = 0;
        
        print("Reading numpy array from file", file)
        input = load_data(file)['arr_0']

        data = init_data()
        data = add_bones(data)
       
        for keypoints in input:
            data = add_keypoints(data, keypoints, currentFrame)
            
            # Calculate 1D position mapping for LED control via DMX on stage.
            data = add_mapped_positions(data, currentFrame)
            currentFrame += 1
        
        write_json(data, dir, base)