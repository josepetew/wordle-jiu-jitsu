import random

database = {
    "AD": ["B", "C", "D"],
    "BD": ["C", "A", "D"],
}
dbkeys = list(database)
all_positions = sum([database[k] for k in database], [])

def gen_question():
    return random.choice(dbkeys)

def gen_sequence(xkey):
    return database[xkey]

def gen_inputs(answers: list, n: int):
    x = answers.copy()
    random.shuffle(x)
    y = random.sample(all_positions, n - len(x))
    return x + y

def main():
    xk = gen_question()
    answers = gen_sequence(xk)
    final = gen_inputs(answers, 4)
    print(final)

if __name__ == '__main__':
    main()
