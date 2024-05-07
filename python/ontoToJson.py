
import json




def extract_hierarchy(jsonld_file,output_file):
    with open(jsonld_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    hierarchy = []
    for entry in data:
        entry_data = {}
        entry_data['className'] = entry.get('@id', []).split('#')[-1]

       
        type_value = entry.get('@type', [''])[0].split('#')[-1]
        entry_data['type'] = str(type_value).strip('\"') if type_value else ''


        entry_data['parent'] = [sub_class['@id'].split('#')[-1] for sub_class in entry.get('http://www.w3.org/2000/01/rdf-schema#subClassOf', [])]

        description_value= entry.get('http://www.w3.org/2002/07/owl#description',[''])[0]
        entry_data['description']= str(description_value['@value']).strip('\"') if description_value else ''

        

        creator_value = entry.get('http://purl.org/dc/elements/1.1/creator', [''])[0]
        entry_data['creator'] = str(creator_value['@value']).strip('\"') if creator_value else ''

        source_value = entry.get('http://www.w3.org/2002/07/owl#source', [''])[0]
        entry_data['source'] = str(source_value['@value']).strip('\"') if source_value else ''

        date_value = entry.get('http://purl.org/dc/elements/1.1/date', [''])[0]
        entry_data['date'] = str(date_value['@value']).strip('\"') if date_value else ''

        hierarchy.append(entry_data)
       
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(hierarchy, f, indent=4)

    return hierarchy






jsonld_file = r'C:\Users\ahmad\ontologies\SecAirSpace\SecAirSpace.jsonld'
output2_file = 'output_hierarchy42.json'
hierarchy = extract_hierarchy(jsonld_file, output2_file)


'''def build_tree(hierarchy, root):
    tree = {'name': root}
    entry_data = hierarchy.get(root, {})
    children = entry_data.get('subClassOf', [])
    if children:
        tree['children'] = [build_tree(hierarchy, child) for child in children]
    # Include additional information in the tree node
    tree.update(entry_data)
    return tree'''


'''root_class = 'https://w3id.org/airm-o/ontology#Entity'  # Specify your root class here
tree_structure = build_tree(hierarchy, root_class)'''


'''with open('ontology_hierarchy_tree12.json', 'w') as f:
    json.dump(tree_structure, f, indent=2)
'''









def build_tree(data, root):
    tree = {key: root.get(key) for key in root.keys() if key != 'children'}
    children = [entry for entry in data if root['className'] in entry.get('parent', [])]
    if children:
        tree['children'] = [build_tree(data, child) for child in children]
    return tree

def load_json(filename):
    with open(filename, 'r', encoding='utf-8') as file:
        return json.load(file)

def main():
    
    filename = r'C:\Users\ahmad\Desktop\DeepBlue\React-learn\python\cascading\output_hierarchy12.json'  # Replace with the actual path to your JSON data file
    data = load_json(filename)
    
    
    root_classes = [entry for entry in data if not entry.get('parent')]
    
    # Build the tree structure for each root class
    tree_structures = [build_tree(data, root) for root in root_classes]
    
   
    with open('tree_structure.json', 'w', encoding='utf-8') as file:
        json.dump(tree_structures, file, indent=4)

if __name__ == '__main__':
    main()






#The code below is for building the tree with just class names, but with the main code we can build the whole tree with all nodes properties.
'''


import json

def build_tree(data, root):
    tree = {'name': root}
    children = [entry for entry in data if root in entry.get('parent', [])]
    if children:
        tree['children'] = [build_tree(data, child['className']) for child in children]
    return tree

def load_json(filename):
    with open(filename, 'r', encoding='utf-8') as file:
        return json.load(file)

def main():
    # Load JSON data from file
    filename = 'your_json_data_file.json'  # Replace with the actual path to your JSON data file
    data = load_json(filename)
    
    # Specify the root node (e.g., top-level parent)
    root_class = 'root_class_name'  # Change this to match your root class
    
    # Build the tree structure
    tree_structure = build_tree(data, root_class)
    
    # Save the tree structure as JSON
    with open('tree_structure.json', 'w', encoding='utf-8') as file:
        json.dump(tree_structure, file, indent=4)

if __name__ == '__main__':
    main()

'''

