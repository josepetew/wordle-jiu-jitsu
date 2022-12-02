# wordle-jiu-jitsu
A wordle like web app to improve your Brazilian jiu-jitsu.

To get started simply
```
poetry install
poetry shell
python manage.py migrate
python manage.py runserver
```

The Django Project is called `wjj` and the Wordle App
is called `wordle`.


# The Game

There will be a variable number of columns (max at 7) that will define the grid.
You have 5 guesses to define the correct sequence to get from position A to B 
in Brazilian Jiu-Jitsu.

The order in which you select the sequence will dictate the sequence you are
electing to make.

So, if the sequence is `A->B->C->D->E->F->G->H->I` you'd see the following grid:

```
  A _ _ _ _ _ _ _ I
1:  | | | | | | |
2:  | | | | | | |
3:  | | | | | | |
4:  | | | | | | |
5:  | | | | | | |
```

Similar to Wordle, correct moves will be colored green and moves colored yellow
indicate that the move is in the sequence but chosen move is not in the correct 
order. Moves colored gray are not in the sequence.

If you guess the sequence correctly, the game will terminate immediately and you 
will be victorious.

You can then share your score by hitting the share button, which will copy the 
following:

BJJ Wordle 810 3/5 🤙

⬛⬛⬛⬛⬛⬛ 👊
🟩🟩🟨🟩🟩🟨 🤞
🟩🟩🟩🟩🟩🟩 🤝

link-to-bjj-wordle-website.
