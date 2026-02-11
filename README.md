# Description

For Assignment 2, I created visualizations with the "penglings" data set using ggplot (in R), d3 (in Javascript), altair (in Python), Excel, DataWrapper, Tableau, and Flourish.

## ggplot

<img width="1641" height="1216" alt="penglings_ggplot" src="https://github.com/user-attachments/assets/a3ee0d11-457a-4398-b579-234952286764" />
<br>
<br>
Using "ggplot" to make this plot was the default tool for me and I used the above plot as a reference when I made the other visualizations. I use R regularly and teach my students in introductory statistics how to use R, including how to make basic plots with the "ggplot2" library. Since I have years of experience using R, I found making this plot very easyand had existing code I could use as a template. One of the reasons I encourage my students to learn how to use "ggplot," rather than just use the default plotting functions in R (e.g., "plot" and "hist") is because I like the "ggplot" syntax being in one block of code, with the first line calling the data and laying out what variables within the data you are plotting, then "building" the plot with the corresponding lines. Once you learn the basics of "ggplot," it is easy to build on that knowledge and make more complex plots without significantly changing the base code.

## d3

<img width="798" height="598" alt="penglings_d3" src="https://github.com/user-attachments/assets/85ab193a-1a71-447e-a29f-37a1153d6d7c" />
<br>
<br>
This one was a doozy... To make such a basic plot using "d3" required much *much* more code than I used in "ggplot." Needing to create variables for every aspect of the plot (e.g., axes) did not make me interested in using this tool again to make this type of plot. Perhaps there is a use for this tool when making visualizations, but, having used "ggplot" for years, I do not see how "d3" could be a *better* option than R for basic plotting. While I did not explore all the possible options with "d3," there may be more flexibility than "ggplot," but I would only consider using this tool if I had to make a complex visualization that requires features not available in "ggplot" or "altair."
<br>
<br>
Or did I not use "d3" as effectively as I could have?

## altair

<img width="969" height="613" alt="penglings_python_ss" src="https://github.com/user-attachments/assets/7b9afcc5-26d8-4a32-a056-71106da73adf" />
<br>
<br>
Like "ggplot," I like the syntax of the "chart" function using one block of code. Further, I have some experience using Python, so I found this tool moderately easy to use. I had not before used "altair," but my prior knowledge with helped with understanding the syntax and how to add details to the code. I did not observe any limitations, in terms of what was needed to be on the plot, but I would still default to using "ggplot" because that is my comfort zone.

## Excel

<img width="2800" height="1883" alt="penglings_excel" src="https://github.com/user-attachments/assets/6d405cf5-061b-437f-b9da-37aea7fd1f2a" />
<br>
<br>
Excel was another tool that I found very easy to use due to years of experience. However, it does have limitations, like how I could not change the circle radii relative to "bill length." The size of the points could only be changed uniformly. Further, to distinguish point colors by "species," there is no option to "tell" the plot to color the points based on a categorical variable. Instead, you have to rearrange the data and create cells with "#N/A" for when a particular species was not related to the y-values for the highlighted x-values.

## DataWrapper

<img width="622" height="583" alt="penglings_datawrapper_2" src="https://github.com/user-attachments/assets/29c6be77-2bbe-422f-9051-7b74f5aa02f2" />
<br>
<br>
This was my first time using "DataWrapper" and I found it fairly easy to use. There were some limitations, such as the locations of the axis labels, and you were restricted to the options on the interface without the possibility of customization, but I appreciated how easy it was to "tell" the tool, for instance, that "bill length" was the size column. I liked how it had features to allow you to view the plot in "dark mode" and make changes the colors to provide access to those who are colorblind. However, since I am a huge fan of playing around with color palettes, I'm not likely to use this tool again. The colors could only be changed individually, instead of selecting a palette, like those available in "ggplot."

## Tableau

<img width="1460" height="846" alt="penglings_tableau" src="https://github.com/user-attachments/assets/43aebc1c-6f8a-4e52-8a79-3201cae57f3c" />
<br>
<br>
This was my first time using "Tableau," although I had heard of it prior to this course. I had colleagues in industry who used it and those in financial mathematics who have used it. Similar to my experience with "DataWrapper," I found it fairly easy to use and appreciated all the available options for adding a variety of features to the plot. It had more customization options with these features, when compared to other GUI programs, such as being able to change the variation in the size of the circle radii relative to bill length. Further, I appreciated all the different color palette options, similar to those that can be found in "ggplot," "d3," and "altair." If I ever need an alternative tool for developing basic plots such as these, I would consider using "Tableau" again. 

## Flourish

<img width="1461" height="823" alt="penglings_flourish" src="https://github.com/user-attachments/assets/afdb7bee-0e5b-4fb0-8fad-448d797e805f" />
<br>
<br>
This was my first time using "Flourish" and I found it fairly easy to use. I had similar thoughts on it as I did above with "DataWrapper." However, while it did allow changing the circle radii relative to "bill length," it did not have an option to add a legend nor did it allow me to change the variation in size. When looking at the plot, it is difficult to distinguish between the different-sized circles due to there not being a large enough range in size. Different sized radii, relative to one of the variables, is only useful if the plot is imbedded or shared properly, where you can then hover over individual points to see the values.

---

# Technical Details
