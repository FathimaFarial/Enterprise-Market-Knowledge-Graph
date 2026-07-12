import spacy
import networkx as nx

# Load the small English NLP model
nlp = spacy.load("en_core_web_sm")

def process_text_to_graph(text: str):
    doc = nlp(text)
    G = nx.Graph()
    
    # Financial relationship context triggers
    triggers = ["acquire", "bought", "partner", "compete", "step down", "ceo", "merge", "invest"]
    
    # Loop through each individual sentence in the dataset
    for sent in doc.sents:
        # Extract entities that are Organizations (ORG), People (PERSON), or Places (GPE)
        entities = [ent for ent in sent.ents if ent.label_ in ["ORG", "PERSON", "GPE"]]
        
        # We need at least two entities in a sentence to form a connection
        if len(entities) >= 2:
            sent_text = sent.text.lower()
            relationship = "associated_with"  # Default relationship type
            
            # Check if a specific corporate action word is used in this sentence
            for trigger in triggers:
                if trigger in sent_text:
                    relationship = trigger
                    break
            
            # Create connections (edges) between all unique pairs in the sentence
            for i in range(len(entities)):
                for j in range(i + 1, len(entities)):
                    ent1, ent2 = entities[i], entities[j]
                    
                    # Prevent connecting an entity to itself
                    if ent1.text.strip().lower() != ent2.text.strip().lower():
                        G.add_node(ent1.text, label=ent1.label_)
                        G.add_node(ent2.text, label=ent2.label_)
                        G.add_edge(ent1.text, ent2.text, relation=relationship)
                        
    # Format the data into clean arrays that Javascript can instantly read
    nodes = [{"id": node, "label": node, "group": data["label"]} for node, data in G.nodes(data=True)]
    edges = [{"from": u, "to": v, "label": data["relation"]} for u, v, data in G.edges(data=True)]
    
    return {"nodes": nodes, "edges": edges}