import json
import random
import string
from datetime import datetime

alpha = string.ascii_letters[26:]
dbkeys = list(alpha)

def gen_database(k: int=7) -> dict:
    # this generates a sequence for every letter
    database = {}
    for l in dbkeys:
        otherl = l
        while otherl == l:
            otherl = random.choice(alpha)
        lkey = l + otherl
        database[lkey] = random.sample(alpha, k=k)
    
    return database

def get_prompt(dbkeys):
    return random.choice(dbkeys)

def get_answer(database:dict, xkey: string):
    return database[xkey]

def get_selection(all_positions: list, answers: list, n: int):
    complement = [j for j in all_positions if j not in answers]
    res = answers + random.sample(complement, n - len(answers))
    random.shuffle(res)
    return res

def main():
    random.seed(datetime.now())

    db = gen_database(7)
    dbkeys = list(db)
    all_positions = sum([db[k] for k in db], [])

    # this gives u the prompt
    xk = get_prompt(dbkeys)
    print(xk, json.dumps(db[xk], indent=2))

    print(f'get from position {xk[0]} -> {xk[1]}')

    # this gives us the answer
    answers = get_answer(db, xk)

    # this gives us the selection set for users
    final = get_selection(all_positions, answers, 10)

    print(f'the correct answer is: {"->".join(answers)}')
    print(f"the input selection is {final} with {len(final)} choices.")

if __name__ == '__main__':
    main()
