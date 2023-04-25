# wordle-jiu-jitsu
A wordle like web app to improve your Brazilian jiu-jitsu.

To get started simply run using python 3.7.1 and poetry version 1.1.14
which is the only version compatible with render.

First change dir into /backend
```
cd backend
```
Then
```
export $(xargs < .env)
poetry install
poetry shell
python manage.py migrate
python manage.py runserver
python manage.py createsuperuser
python manage runserver
```
Go to http://localhost:8000/admin and login to add data to the backend!

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

Wordle Jitsu 810 3/5 🤙

⬛⬛⬛⬛⬛⬛ 👊

🟩🟩🟨🟩🟩🟨 🤞

🟩🟩🟩🟩🟩🟩 🤝

https://wordlejj.onrender.com/


# The Frontend

NOTE: Make sure django server is running before running the frontend.

To run locally use:
```
npm i
npm run dev
```

To compile new JS you just have to run
```
npm run build
```

To run compiled JS
```
npm run start
```

Note using:
node version v19.6.0
npm version 9.4.0
```
nvm use 19.6.0
```

## Thanks

The Wordle App was largely taken from [Kris Gardner's Repo](https://github.com/krisgardiner/wordle), 
which [he wrote about on dev.to](https://dev.to/krisgardiner/build-wordle-in-react-1hkb). Big thanks to him.
