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
        description="Splits full keypoint sequence import from JSON file into shorter sequences.")

    parser.add_argument('files',
        nargs='*',
        help='Input file containing keypoint sequence as JSON.',)
    
    return parser

def init_data():
    data = {}
    data['bones'] = {}
    data['frames'] = {}
    return data

def get_base(path):
    dir = os.path.dirname(path)
    name = os.path.basename(path)
    base = os.path.splitext(name)[0]
    return (dir, base)

def read_json(files):
    input = ()
    for filename in files:
        filepath = os.path.abspath(filename)
        print("Reading JSON from file", filepath)
        with open(filepath) as f:
            input = input + (json.load(f), )
    return input

def write_json(data, dir, filename):
    with open(dir + '/' + filename, 'w') as outfile:
        json.dump(data, outfile)

if __name__ == '__main__':
    args = get_parser().parse_args()

    if args.files:
        (dir, base) = get_base(args.files[0])
        input = read_json(args.files)

        slices = 240
        current_slice = 0
        frames = input[0]['frames']
        bones = input[0]['bones']
        max_frames = len(frames)
        frames_per_slice = round(max_frames / slices)
       
        data = init_data()
        index_in_slice = 0
        index_begin = 0

        for index in range(max_frames):
            data['frames'][index_in_slice] = frames[str(index)]
            write = False
            # print(index)
            if (index > 0 and (index % frames_per_slice == 0 or index == max_frames - 1)):
                # Write regular or last slice
                
                data['bones'] = bones

                # filename = base + '_' + str(index_begin) + '_' + str(index) + '.json'
                filename = base + '_' + str(current_slice) + '.json'
                print('Writing', len(data['frames']), 'frames to JSON file', dir + '/' + filename)
                write_json(data, dir, filename)

                # Reset for next slice
                data = init_data()
                index_in_slice = 0
                index_begin = index + 1
                current_slice = current_slice + 1
                write = True
            if (not write):
                index_in_slice += 1