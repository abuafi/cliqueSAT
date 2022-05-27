# cliqueSAT 

## Description

  The k-clique problem is a well known computational problem. Given a graph $G(V,E)$ and a number $k$, the problem is to find all possible subgraphs of size K.
  This project aims to solve k-clique problem, by providing a GUI and 2 methods of computing the k-clique of a graph. 
  
For more infomation, a more detailed report is available in `./report/report.pdf`.

## Usage 

The GUI is hosted automatically at this url: https://abuafi.github.io/cliqueSAT/.

Alternatively, clone the repository and open the `index.html` file.

  <img width="1564" alt="Screenshot 2022-05-27 at 17 48 33" src="https://user-images.githubusercontent.com/55785758/170734195-8eb05662-fd2c-4efb-9c59-d73cf1425113.png">
  
  The GUI allows user to create graphs on the canvas. Click anywhere to add a vertex and drag a vertex over another to create an edge between the two.

  Vertices can also be moved, edges can be removed and a set of buttons under the canvas can be used to modify the graph.

  It also possible to download a graph to save it, and load it by dragging the file over the canvas.

  A few presets are also provided.

  By giving the url parameter `debug=true` to the web page (such as by the link https://abuafi.github.io/cliqueSAT?debug=true) it is also possible to see specific information after every solution is computed, such as how many clauses were generated and how much time it took to generate them and solve the problem (in milliseconds).

  From the debug mode one can also run tests, which may take a few minutes to complete.

  ## Visuals
  After a test file has been generated and downloaded placed in the repostory folder, running the script `visuals.py` with the command `python3 visuals.py` generates various visualizations of the data gathered. The resulting files are in the `./report/figures/` folder.

  (The python libraries `pandas`, `seaborn` and `matplotlib` are required for the visuals script)