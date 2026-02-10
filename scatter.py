import altair as alt
import pandas as pd

df = pd.read_csv("penglings.csv")

df.dropna(inplace=True)  # Drop rows with missing values
df = df[df['bill_length_mm'] != 0] # Remove rows where bill_length_mm is zero, as it may indicate missing data

chart = alt.Chart(df).mark_circle(size=80,opacity=0.7).encode(
    x=alt.X('flipper_length_mm',title='Flipper Length (mm)',scale=alt.Scale(domain=[170, 240]),
             axis=alt.Axis(tickCount=7)),
    y=alt.Y('body_mass_g',title='Body Mass (g)',scale=alt.Scale(zero=False),
             axis=alt.Axis(tickCount=6)),
    color=alt.Color('species',title='Species',scale=alt.Scale(scheme='tableau20')),
    size=alt.Size('bill_length_mm',title='Bill Length (mm)',
                  scale=alt.Scale(domain=[df['bill_length_mm'].min(), df['bill_length_mm'].max()])),
    tooltip=['species', 'flipper_length_mm', 'body_mass_g']
).properties(
    title={'text': 'Wicked Cute Nonflying Birds', 
           'subtitle': 'Flipper Length vs Body Mass by Bill Length & Species of Penguins'},
    width=800,
    height=500
).interactive()

chart.save("penglings.html")
