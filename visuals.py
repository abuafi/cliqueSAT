import pandas
import seaborn as sns
import matplotlib.pyplot as plt
dataframe = pandas.read_csv('testOutput.csv')
dataframe["k"] = dataframe["k"].map(str)

presetNames = dataframe['presetName'].unique()
for preset in presetNames:
    plt.title(f"Total time taken for '{preset}' preset")
    sns.lineplot(data=dataframe.query(f'presetName == "{preset}"'), x="k", y="totalTime", hue="solverName")
    plt.savefig(f'./report/figures/Figure_{preset}_time.png')
    plt.close()

    plt.title(f"Number of clauses for '{preset}' preset")
    sns.lineplot(data=dataframe.query(f'presetName == "{preset}"'), x="k", y="clauseNumber", hue="solverName")
    plt.savefig(f'./report/figures/Figure_{preset}_clauses.png')
    plt.close()