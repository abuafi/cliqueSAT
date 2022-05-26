import pandas
import seaborn as sns
import matplotlib.pyplot as plt
dataframe = pandas.read_csv('testOutput.csv')
dataframe["k"] = dataframe["k"].map(str)

plt.title("Test results for 'insect' preset")
sns.lineplot(data=dataframe.query('presetName == "insect"'), x="k", y="totalTime", hue="solverName")
plt.savefig('./report/figures/Figure_1.png')
plt.close()
plt.title("Test results for 'icosagon' preset")
sns.lineplot(data=dataframe.query('presetName == "icosagon"'), x="k", y="totalTime", hue="solverName")
plt.savefig('./report/figures/Figure_2.png')
plt.close()
plt.title("Test results for 'icosagon_random' preset")
sns.lineplot(data=dataframe.query('presetName == "icosagon_random"'), x="k", y="totalTime", hue="solverName")
plt.savefig('./report/figures/Figure_3.png')
plt.close()
